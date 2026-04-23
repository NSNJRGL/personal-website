import { createHash } from "crypto";
import { getEmbeddingModel, getOpenAIClient } from "./openai";
import { getPortfolioChunks, type PortfolioChunk } from "./portfolio";

type EmbeddedChunk = {
  chunk: PortfolioChunk;
  embedding: number[];
};

let embeddedCorpusPromise: Promise<EmbeddedChunk[]> | null = null;
let embeddedCorpusHash = "";

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string) => new Set(normalizeText(value).split(" ").filter((token) => token.length > 2));

const cosineSimilarity = (left: number[], right: number[]) => {
  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (let index = 0; index < left.length; index += 1) {
    dot += left[index] * right[index];
    leftMagnitude += left[index] * left[index];
    rightMagnitude += right[index] * right[index];
  }

  if (!leftMagnitude || !rightMagnitude) {
    return 0;
  }

  return dot / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
};

const keywordScore = (question: string, chunk: PortfolioChunk) => {
  const questionTokens = tokenize(question);
  if (!questionTokens.size) {
    return 0;
  }

  const chunkTokens = tokenize(`${chunk.title} ${chunk.content} ${chunk.tags.join(" ")}`);
  let matches = 0;

  for (const token of Array.from(questionTokens)) {
    if (chunkTokens.has(token)) {
      matches += 1;
    }
  }

  return matches / questionTokens.size;
};

const getCorpusHash = (chunks: PortfolioChunk[]) => {
  return createHash("sha1").update(JSON.stringify(chunks)).digest("hex");
};

const getEmbeddedCorpus = async () => {
  const chunks = getPortfolioChunks();
  const nextHash = getCorpusHash(chunks);

  if (embeddedCorpusPromise && embeddedCorpusHash === nextHash) {
    return embeddedCorpusPromise;
  }

  embeddedCorpusHash = nextHash;
  embeddedCorpusPromise = (async () => {
    const client = getOpenAIClient();
    const response = await client.embeddings.create({
      model: getEmbeddingModel(),
      input: chunks.map((chunk) => `${chunk.title}\n${chunk.content}`),
    });

    return chunks.map((chunk, index) => ({
      chunk,
      embedding: response.data[index].embedding,
    }));
  })();

  return embeddedCorpusPromise;
};

export const retrieveRelevantChunks = async (question: string, limit = 5) => {
  const client = getOpenAIClient();

  const [embeddedChunks, queryEmbeddingResponse] = await Promise.all([
    getEmbeddedCorpus(),
    client.embeddings.create({
      model: getEmbeddingModel(),
      input: question,
    }),
  ]);

  const queryEmbedding = queryEmbeddingResponse.data[0].embedding;

  return embeddedChunks
    .map(({ chunk, embedding }) => {
      const semantic = cosineSimilarity(queryEmbedding, embedding);
      const lexical = keywordScore(question, chunk);

      return {
        chunk,
        score: semantic * 0.8 + lexical * 0.2,
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((item) => item.chunk);
};
