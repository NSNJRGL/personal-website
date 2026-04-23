import assert from "node:assert/strict";
import test from "node:test";
import {
  getV1AboutParagraphs,
  getV1FeatureCards,
  getV1HomeIntro,
  getV1ResumeLink,
  getV1SkillSections,
} from "../src/lib/portfolioV1";

test("v1 home intro reuses the shared profile data", () => {
  const intro = getV1HomeIntro();

  assert.equal(intro.name, "Nasanjargal Binderiya");
  assert.match(intro.shortBio, /over 7 years of experience/i);
  assert.match(intro.focusIntro, /Scalable web applications/);
});

test("v1 feature cards are derived from project data", () => {
  const featureCards = getV1FeatureCards();

  assert.equal(featureCards.length, 5);
  assert.equal(featureCards[0].title, "Custom Observability Suite");
  assert.match(featureCards[0].body, /Reduced manual routing/i);
  assert.equal(featureCards[featureCards.length - 1].isWide, true);
  assert.equal(featureCards.some((card) => card.body.includes("[Add")), false);
});

test("v1 about and skills sections pull from shared portfolio content", () => {
  const aboutParagraphs = getV1AboutParagraphs();
  const skillSections = getV1SkillSections();

  assert.equal(getV1ResumeLink(), "/resume.pdf");
  assert.equal(aboutParagraphs.some((paragraph) => paragraph.includes("Austin, TX, USA")), true);
  assert.equal(aboutParagraphs.some((paragraph) => paragraph.includes("Acoustic guitar")), true);
  assert.deepEqual(skillSections.map((section) => section.title), [
    "Language",
    "Technology",
    "Tool",
    "System",
  ]);
  assert.equal(
    skillSections.find((section) => section.id === "technology")?.skills.includes("Next.js"),
    true,
  );
  assert.equal(
    skillSections.find((section) => section.id === "system")?.skills.includes("Terraform"),
    true,
  );
});
