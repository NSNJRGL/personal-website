import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

export const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return openaiClient;
};

export const getChatModel = () => process.env.OPENAI_MODEL || "gpt-5.4-nano";

export const getEmbeddingModel = () =>
  process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";
