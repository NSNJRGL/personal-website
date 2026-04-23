import assert from "node:assert/strict";
import test from "node:test";
import { createRetryableAsyncSingleton } from "../src/lib/retryableAsyncSingleton";

test("retries the same key after a failed load", async () => {
  const singleton = createRetryableAsyncSingleton<number>();
  let attempts = 0;

  await assert.rejects(
    singleton.load("portfolio", async () => {
      attempts += 1;
      throw new Error("temporary failure");
    }),
    /temporary failure/,
  );

  const value = await singleton.load("portfolio", async () => {
    attempts += 1;
    return 42;
  });

  assert.equal(value, 42);
  assert.equal(attempts, 2);
});

test("reuses the same in-flight promise for repeated keys", async () => {
  const singleton = createRetryableAsyncSingleton<number>();
  let attempts = 0;

  const loader = async () => {
    attempts += 1;
    await new Promise((resolve) => setTimeout(resolve, 10));
    return 7;
  };

  const [first, second] = await Promise.all([
    singleton.load("portfolio", loader),
    singleton.load("portfolio", loader),
  ]);

  assert.equal(first, 7);
  assert.equal(second, 7);
  assert.equal(attempts, 1);
});
