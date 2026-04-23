import assert from "node:assert/strict";
import test from "node:test";
import {
  buildProjectChunkContent,
  isPlaceholderContent,
} from "../src/lib/portfolio";

test("detects placeholder content markers", () => {
  assert.equal(isPlaceholderContent("[Add problem statement]"), true);
  assert.equal(isPlaceholderContent("Implemented server-side rendering"), false);
});

test("omits placeholder project fields from retrieval content", () => {
  const content = buildProjectChunkContent({
    summary: "Led development of a full-stack application.",
    problem: "[Add problem statement]",
    solution: "Built using React and Node.js.",
    impact: ["[Add measurable impact if available]"],
    tech: ["React", "Node.js"],
  });

  assert.equal(
    content,
    "Led development of a full-stack application. Solution: Built using React and Node.js. Technologies: React, Node.js.",
  );
  assert.equal(content.includes("[Add"), false);
  assert.equal(content.includes("Problem:"), false);
  assert.equal(content.includes("Impact:"), false);
});
