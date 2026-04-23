import assert from "node:assert/strict";
import test from "node:test";
import {
  buildQuickLinks,
  createStreamingAssistantMessage,
  rotateVisiblePrompts,
} from "../src/components/chat/helpers";

test("buildQuickLinks keeps only configured links", () => {
  assert.deepEqual(
    buildQuickLinks({
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
      resume: "/resume.pdf",
    }),
    [
      { label: "Resume", href: "/resume.pdf" },
      { label: "GitHub", href: "https://github.com/example" },
      { label: "LinkedIn", href: "https://linkedin.com/in/example" },
    ],
  );
});

test("rotateVisiblePrompts replaces a selected prompt with the next unseen one", () => {
  const result = rotateVisiblePrompts(
    [
      "What kind of engineer is Nasanjargal?",
      "Tell me about his performance optimization work.",
      "What technologies has he used recently?",
    ],
    "Tell me about his performance optimization work.",
    3,
  );

  assert.deepEqual(result.prompts, [
    "What kind of engineer is Nasanjargal?",
    "How can I contact him?",
    "What technologies has he used recently?",
  ]);
  assert.equal(result.nextRotationIndex, 4);
});

test("createStreamingAssistantMessage starts empty and flagged as streaming", () => {
  const message = createStreamingAssistantMessage();

  assert.equal(message.role, "assistant");
  assert.equal(message.content, "");
  assert.equal(message.isStreaming, true);
  assert.equal(typeof message.id, "string");
  assert.equal(typeof message.createdAt, "string");
});
