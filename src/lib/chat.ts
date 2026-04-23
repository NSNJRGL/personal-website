import { getChatModel, getOpenAIClient } from "./openai";
import { type PortfolioSource } from "./portfolio";
import { retrieveRelevantChunks } from "./retrieve";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatResult = {
  answer: string;
  sources: PortfolioSource[];
};

const SYSTEM_PROMPT = `You are Nasanjargal Binderiya's portfolio assistant.

Answer only questions about Nasanjargal Binderiya, his experience, projects, skills, background, interests, availability, and contact links.

Rules:
- Use only the provided context.
- If the context is missing or incomplete, say you do not have enough information.
- Do not invent employers, project details, dates, links, metrics, or technologies.
- Keep answers concise, friendly, and direct.
- When useful, mention the most relevant source names naturally.
- If the user asks for something unrelated to Nasanjargal, politely refuse and steer back to portfolio questions.`;

const toSource = (chunk: {
  id: string;
  title: string;
  type: PortfolioSource["type"];
  url?: string;
}): PortfolioSource => ({
  id: chunk.id,
  title: chunk.title,
  type: chunk.type,
  url: chunk.url,
});

const buildPromptMessages = async (messages: ChatMessage[]) => {
  const trimmedMessages = messages.slice(-6);
  const latestUserMessage = [...trimmedMessages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    throw new Error("A user question is required.");
  }

  const relevantChunks = await retrieveRelevantChunks(latestUserMessage.content, 5);
  const context = relevantChunks
    .map((chunk, index) => `[${index + 1}] ${chunk.title}\n${chunk.content}`)
    .join("\n\n");

  return {
    relevantChunks,
    promptMessages: [
      {
        role: "system" as const,
        content: `${SYSTEM_PROMPT}\n\nContext:\n${context}\n\nDo not use markdown formatting like **bold** in your answer. Return plain text only.`,
      },
      ...trimmedMessages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ],
  };
};

export const answerPortfolioQuestion = async (
  messages: ChatMessage[],
): Promise<ChatResult> => {
  const { relevantChunks, promptMessages } = await buildPromptMessages(messages);

  const client = getOpenAIClient();
  const completion = await client.chat.completions.create({
    model: getChatModel(),
    temperature: 0.2,
    messages: promptMessages,
  });

  const answer = completion.choices[0]?.message?.content?.trim();

  if (!answer) {
    throw new Error("No answer was returned by the model.");
  }

  return {
    answer,
    sources: relevantChunks.map(toSource),
  };
};

export const streamPortfolioAnswer = async (
  messages: ChatMessage[],
  onToken: (token: string) => Promise<void> | void,
) => {
  const { relevantChunks, promptMessages } = await buildPromptMessages(messages);
  const client = getOpenAIClient();
  const stream = await client.chat.completions.create({
    model: getChatModel(),
    temperature: 0.2,
    stream: true,
    messages: promptMessages,
  });

  for await (const chunk of stream) {
    const token = chunk.choices[0]?.delta?.content;
    if (token) {
      await onToken(token);
    }
  }

  return {
    sources: relevantChunks.map(toSource),
  };
};
