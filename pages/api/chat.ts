import type { NextApiRequest, NextApiResponse } from "next";
import { streamPortfolioAnswer, type ChatMessage } from "src/lib/chat";
import {
  logPortfolioChatError,
  toPublicChatErrorMessage,
} from "src/lib/chatError";

type ErrorResponse = {
  error: string;
};

const writeServerSentEvent = (
  res: NextApiResponse<ErrorResponse>,
  event: string,
  data: unknown,
) => {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
};

const isChatMessage = (value: unknown): value is ChatMessage => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const messages = Array.isArray(req.body?.messages)
    ? req.body.messages.filter(isChatMessage).slice(-10)
    : [];

  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    return res.status(400).json({ error: "A user question is required." });
  }

  if (latestUserMessage.content.length > 2000) {
    return res.status(400).json({ error: "Please keep questions under 2000 characters." });
  }

  try {
    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    });

    const result = await streamPortfolioAnswer(messages, (token) => {
      writeServerSentEvent(res, "token", token);
    });

    writeServerSentEvent(res, "sources", result.sources);
    writeServerSentEvent(res, "done", "ok");
    res.end();
    return;
  } catch (error) {
    logPortfolioChatError("stream failed", error);
    const message = toPublicChatErrorMessage(error);

    if (!res.headersSent) {
      return res.status(500).json({ error: message });
    }

    writeServerSentEvent(res, "error", message);
    res.end();
    return;
  }
}
