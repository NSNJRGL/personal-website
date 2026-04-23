import experienceData from "src/content/portfolio/experience.json";
import faqData from "src/content/portfolio/faq.json";
import linksData from "src/content/portfolio/links.json";
import profileData from "src/content/portfolio/profile.json";
import projectsData from "src/content/portfolio/projects.json";
import skillsData from "src/content/portfolio/skills.json";

export type PortfolioLinkSet = {
  website?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  phone?: string;
  resume?: string;
  portfolioV1?: string;
};

type Profile = {
  name: string;
  headline: string;
  shortBio: string;
  location?: string;
  phone?: string;
  email?: string;
  yearsOfExperience: number;
  currentRole?: string;
  currentFocus: string[];
  personalInterests: string[];
  educationSummary?: string;
  status?: string;
};

type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  tech: string[];
  domain?: string;
  url?: string;
};

type ProjectItem = {
  id: string;
  name: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string[];
  tech: string[];
  links?: {
    demo?: string;
    github?: string;
  };
};

type Skills = Record<string, string[]>;

type FaqItem = {
  question: string;
  answer: string;
};

export type PortfolioChunk = {
  id: string;
  type: "profile" | "experience" | "project" | "skills" | "links" | "faq";
  title: string;
  content: string;
  url?: string;
  tags: string[];
};

export type PortfolioSource = {
  id: string;
  title: string;
  type: PortfolioChunk["type"];
  url?: string;
};

const profile = profileData as Profile;
const experience = experienceData as ExperienceItem[];
const projects = projectsData as ProjectItem[];
const skills = skillsData as Skills;
const links = linksData as PortfolioLinkSet;
const faq = (faqData as FaqItem[]) || [];

const formatSkillSection = (name: string, values: string[]) => `${name}: ${values.join(", ")}`;

const hasPlaceholder = (value?: string) => Boolean(value && value.includes("[Add"));

export const getPortfolioProfile = () => profile;

export const getPortfolioLinks = () => links;

export const getPortfolioChunks = (): PortfolioChunk[] => {
  const chunks: PortfolioChunk[] = [];

  chunks.push({
    id: "profile-overview",
    type: "profile",
    title: "Profile Overview",
    url: links.website,
    tags: [profile.headline, profile.currentRole || "", ...profile.currentFocus],
    content: [
      `${profile.name} is a ${profile.headline}.`,
      profile.shortBio,
      profile.currentRole ? `Current role: ${profile.currentRole}.` : "",
      profile.location ? `Location: ${profile.location}.` : "",
      profile.educationSummary ? `Education: ${profile.educationSummary}` : "",
      profile.status ? `Availability: ${profile.status}.` : "",
    ]
      .filter(Boolean)
      .join(" "),
  });

  chunks.push({
    id: "profile-interests",
    type: "profile",
    title: "Personal Interests",
    url: links.website,
    tags: profile.personalInterests,
    content: `${profile.name}'s interests include ${profile.personalInterests.join(", ")}.`,
  });

  for (const item of experience) {
    chunks.push({
      id: `${item.id}-summary`,
      type: "experience",
      title: `${item.role} at ${item.company}`,
      url: hasPlaceholder(item.url) ? undefined : item.url,
      tags: [item.company, item.role, ...item.tech],
      content: [
        `${item.role} at ${item.company} from ${item.startDate} to ${item.endDate}.`,
        item.summary,
        item.domain ? `Domain: ${item.domain}.` : "",
        `Technologies: ${item.tech.join(", ")}.`,
        `Highlights: ${item.highlights.join(" ")}`,
      ]
        .filter(Boolean)
        .join(" "),
    });
  }

  for (const item of projects) {
    chunks.push({
      id: item.id,
      type: "project",
      title: item.name,
      url: item.links?.demo || item.links?.github,
      tags: [item.name, ...item.tech],
      content: [
        item.summary,
        `Problem: ${item.problem}`,
        `Solution: ${item.solution}`,
        `Impact: ${item.impact.join(" ")}`,
        `Technologies: ${item.tech.join(", ")}.`,
      ].join(" "),
    });
  }

  chunks.push({
    id: "skills-overview",
    type: "skills",
    title: "Skills Overview",
    tags: Object.values(skills).flat(),
    content: Object.entries(skills)
      .map(([name, values]) => formatSkillSection(name, values))
      .join(" "),
  });

  chunks.push({
    id: "links-overview",
    type: "links",
    title: "Contact and Links",
    url: links.website,
    tags: ["contact", "linkedin", "github", "resume", "email"],
    content: [
      links.email ? `Email: ${links.email}.` : "",
      links.phone ? `Phone: ${links.phone}.` : "",
      links.linkedin ? `LinkedIn: ${links.linkedin}.` : "",
      links.github ? `GitHub: ${links.github}.` : "",
      links.resume ? `Resume: ${links.resume}.` : "",
      links.portfolioV1 ? `Legacy portfolio: ${links.portfolioV1}.` : "",
    ]
      .filter(Boolean)
      .join(" "),
  });

  for (const item of faq) {
    chunks.push({
      id: `faq-${item.question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      type: "faq",
      title: item.question,
      tags: item.question.split(" "),
      content: `Question: ${item.question} Answer: ${item.answer}`,
    });
  }

  return chunks;
};
