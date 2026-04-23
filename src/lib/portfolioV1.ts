import {
  getPortfolioLinks,
  getPortfolioProfile,
  getPortfolioProjects,
  getPortfolioSkills,
  isPlaceholderContent,
  type PortfolioProjectItem,
  type PortfolioSkills,
} from "./portfolio";

export type V1FeatureCard = {
  id: string;
  title: string;
  body: string;
  icon: string;
  isWide?: boolean;
};

export type V1SkillSection = {
  id: string;
  title: string;
  emoji: string;
  skills: string[];
};

const featureIcons = ["🚀", "🧠", "⚙️", "📈", "⚡"] as const;

const skillSectionGroups: Array<{
  id: string;
  title: string;
  emoji: string;
  sourceKeys: Array<keyof PortfolioSkills>;
}> = [
  { id: "language", title: "Language", emoji: "🗣️", sourceKeys: ["languages"] },
  { id: "technology", title: "Technology", emoji: "💡", sourceKeys: ["frontend", "backend"] },
  {
    id: "tool",
    title: "Tool",
    emoji: "🔧",
    sourceKeys: ["stateManagement", "testing", "aiTools", "designAndCollaboration"],
  },
  {
    id: "system",
    title: "System",
    emoji: "☁️",
    sourceKeys: ["cloud", "databases", "devOpsAndInfra"],
  },
];

const ensureSentence = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  return /[.!?]$/.test(trimmedValue) ? trimmedValue : `${trimmedValue}.`;
};

const formatList = (values: string[]) => {
  if (values.length === 0) {
    return "";
  }

  if (values.length === 1) {
    return values[0];
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
};

const getPrimaryImpact = (project: PortfolioProjectItem) =>
  project.impact.find((item) => !isPlaceholderContent(item) && item.trim());

const createFeatureCardBody = (project: PortfolioProjectItem) => {
  const summary = ensureSentence(project.summary);
  const impact = getPrimaryImpact(project);

  return [summary, impact ? ensureSentence(impact) : ""].filter(Boolean).join(" ");
};

export const getV1FeatureCards = (): V1FeatureCard[] =>
  getPortfolioProjects()
    .filter((project) => project.summary.trim())
    .slice(0, featureIcons.length)
    .map((project, index, cards) => ({
      id: project.id,
      title: project.name,
      body: createFeatureCardBody(project),
      icon: featureIcons[index],
      isWide: index === cards.length - 1 && cards.length % 2 === 1,
    }));

export const getV1HomeIntro = () => {
  const profile = getPortfolioProfile();
  const primaryFocus = formatList(profile.currentFocus.slice(0, 3));

  return {
    name: profile.name,
    shortBio: profile.shortBio,
    focusIntro: primaryFocus
      ? `Most of my recent work centers on ${primaryFocus}, with an emphasis on measurable product and platform improvements.`
      : "",
  };
};

export const getV1AboutParagraphs = () => {
  const profile = getPortfolioProfile();
  const paragraphs = [
    ensureSentence(profile.shortBio),
    profile.currentRole
      ? `Currently working as ${profile.currentRole}. My recent focus includes ${formatList(profile.currentFocus)}.`
      : "",
    profile.educationSummary ? ensureSentence(profile.educationSummary) : "",
    profile.personalInterests.length
      ? `Outside of engineering, I enjoy ${formatList(profile.personalInterests)}.`
      : "",
    [
      profile.location ? `Based in ${profile.location}` : "",
      profile.status ? `Availability: ${profile.status}` : "",
    ]
      .filter(Boolean)
      .join(". "),
  ];

  return paragraphs
    .map((paragraph) => ensureSentence(paragraph))
    .filter(Boolean);
};

export const getV1ResumeLink = () => getPortfolioLinks().resume || "/resume.pdf";

export const getV1SkillSections = (): V1SkillSection[] => {
  const skills = getPortfolioSkills();

  return skillSectionGroups.map((group) => ({
    id: group.id,
    title: group.title,
    emoji: group.emoji,
    skills: Array.from(
      new Set(group.sourceKeys.flatMap((key) => skills[key] || [])),
    ),
  }));
};
