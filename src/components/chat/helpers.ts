import type { PortfolioLinkSet } from "src/lib/portfolio";
import type { ChatMessage, ChatSource } from "./types";

export const starterPrompts = [
  "What kind of engineer is Nasanjargal?",
  "Tell me about his performance optimization work.",
  "What technologies has he used recently?",
  "How can I contact him?",
  "Is he open to freelance work?",
  "What did he build at Thermo Fisher Scientific?",
  "What AI-assisted workflows does he use?",
  "What backend technologies does he use?",
  "What performance results has he achieved?",
] as const;

export const placeholderPrompts = [
  "Ask about his recent projects",
  "What does he optimize most often?",
  "How can I hire or contact him?",
  "Which technologies does he use?",
] as const;

const createMessageTimestamp = () =>
  new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const createMessageId = (role: ChatMessage["role"]) =>
  `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const createChatMessage = (
  role: ChatMessage["role"],
  content: string,
  sources?: ChatSource[],
): ChatMessage => ({
  id: createMessageId(role),
  role,
  content,
  createdAt: createMessageTimestamp(),
  sources,
});

export const createStreamingAssistantMessage = (): ChatMessage => ({
  id: createMessageId("assistant"),
  role: "assistant",
  content: "",
  createdAt: createMessageTimestamp(),
  isStreaming: true,
});

export const buildQuickLinks = (links: PortfolioLinkSet) =>
  [
    { label: "Resume", href: links.resume },
    { label: "GitHub", href: links.github },
    { label: "LinkedIn", href: links.linkedin },
    { label: "V1", href: links.portfolioV1 },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

export const rotateVisiblePrompts = (
  currentPrompts: string[],
  selectedPrompt: string,
  rotationIndex: number,
) => {
  if (starterPrompts.length <= currentPrompts.length) {
    return {
      prompts: currentPrompts,
      nextRotationIndex: rotationIndex,
    };
  }

  let replacement = selectedPrompt;
  let nextRotationIndex = rotationIndex;
  let attempts = 0;

  while (attempts < starterPrompts.length) {
    const candidate = starterPrompts[nextRotationIndex % starterPrompts.length];
    nextRotationIndex += 1;
    attempts += 1;

    if (!currentPrompts.includes(candidate)) {
      replacement = candidate;
      break;
    }
  }

  return {
    prompts: currentPrompts.map((currentPrompt) =>
      currentPrompt === selectedPrompt ? replacement : currentPrompt,
    ),
    nextRotationIndex,
  };
};
