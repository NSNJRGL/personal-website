import assert from "node:assert/strict";
import test from "node:test";
import {
  UNEXPECTED_STREAM_END_MESSAGE,
  drainServerSentEventBuffer,
  readServerSentEventStream,
} from "../src/components/chat/sse";

const createStream = (chunks: string[]) => {
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });
};

test("drains complete events and preserves the trailing partial chunk", () => {
  const result = drainServerSentEventBuffer(
    'event: token\ndata: "Hi"\n\nevent: sources\ndata: []\n\nevent: done\ndata:',
  );

  assert.deepEqual(result.events, [
    { event: "token", data: '"Hi"' },
    { event: "sources", data: "[]" },
  ]);
  assert.equal(result.remainder, "event: done\ndata:");
});

test("throws when the SSE stream ends before a done event arrives", async () => {
  const events: Array<{ event: string; data: string }> = [];

  await assert.rejects(
    readServerSentEventStream(
      createStream(['event: token\ndata: "Hi"\n\n']),
      (event) => {
        events.push(event);
      },
    ),
    /The response ended before the answer was complete/,
  );

  assert.deepEqual(events, [{ event: "token", data: '"Hi"' }]);
});

test("accepts fragmented streams once the done event arrives", async () => {
  const events: Array<{ event: string; data: string }> = [];

  await readServerSentEventStream(
    createStream([
      'event: token\ndata: "He',
      'llo"\n\n',
      "event: done\ndata: ok\n\n",
    ]),
    (event) => {
      events.push(event);
    },
  );

  assert.deepEqual(events, [
    { event: "token", data: '"Hello"' },
    { event: "done", data: "ok" },
  ]);
  assert.equal(UNEXPECTED_STREAM_END_MESSAGE.length > 0, true);
});
