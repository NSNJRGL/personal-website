import assert from "node:assert/strict";
import test from "node:test";
import {
  PORTFOLIO_CHAT_ERROR_MESSAGE,
  toPublicChatErrorMessage,
} from "../src/lib/chatError";

test("maps provider and configuration failures to the same public message", () => {
  assert.equal(
    toPublicChatErrorMessage(new Error("OPENAI_API_KEY is not configured.")),
    PORTFOLIO_CHAT_ERROR_MESSAGE,
  );
  assert.equal(
    toPublicChatErrorMessage(new Error("upstream timeout")),
    PORTFOLIO_CHAT_ERROR_MESSAGE,
  );
});
