export type ServerSentEvent = {
  event: string;
  data: string;
};

export const UNEXPECTED_STREAM_END_MESSAGE =
  "The response ended before the answer was complete. Please try again.";

export const parseServerSentEventBlock = (block: string): ServerSentEvent | null => {
  const lines = block
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean);

  const event = lines.find((line) => line.startsWith("event:"))?.replace("event:", "").trim();
  const dataLines = lines
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.replace("data:", "").trim());

  if (!event || !dataLines.length) {
    return null;
  }

  return {
    event,
    data: dataLines.join("\n"),
  };
};

export const drainServerSentEventBuffer = (buffer: string) => {
  const blocks = buffer.split("\n\n");
  const remainder = blocks.pop() || "";

  return {
    events: blocks
      .map((block) => parseServerSentEventBlock(block))
      .filter((event): event is ServerSentEvent => Boolean(event)),
    remainder,
  };
};

export const readServerSentEventStream = async (
  stream: ReadableStream<Uint8Array>,
  onEvent: (event: ServerSentEvent) => Promise<void> | void,
) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let receivedDone = false;

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const { events, remainder } = drainServerSentEventBuffer(buffer);
    buffer = remainder;

    for (const event of events) {
      await onEvent(event);
      if (event.event === "done") {
        receivedDone = true;
      }
    }
  }

  buffer += decoder.decode();

  if (buffer.trim()) {
    const finalEvent = parseServerSentEventBlock(buffer);

    if (finalEvent) {
      await onEvent(finalEvent);
      if (finalEvent.event === "done") {
        receivedDone = true;
      }
    }
  }

  if (!receivedDone) {
    throw new Error(UNEXPECTED_STREAM_END_MESSAGE);
  }
};
