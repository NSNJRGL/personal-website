import { useEffect, useRef, useState } from "react";
import {
  createChatMessage,
  createStreamingAssistantMessage,
  placeholderPrompts,
  rotateVisiblePrompts,
  starterPrompts,
} from "./helpers";
import { readServerSentEventStream } from "./sse";
import type { ChatMessage, ChatSource } from "./types";

const GENERIC_CHAT_ERROR_MESSAGE =
  "Something went wrong while generating the answer.";

const updateMessageById = (
  messages: ChatMessage[],
  messageId: string,
  updateMessage: (message: ChatMessage) => ChatMessage,
) =>
  messages.map((message) =>
    message.id === messageId ? updateMessage(message) : message,
  );

const appendAssistantContent = (
  messages: ChatMessage[],
  assistantId: string,
  content: string,
) =>
  updateMessageById(messages, assistantId, (message) => ({
    ...message,
    content: `${message.content}${content}`,
  }));

const attachAssistantSources = (
  messages: ChatMessage[],
  assistantId: string,
  sources: ChatSource[],
) =>
  updateMessageById(messages, assistantId, (message) => ({
    ...message,
    sources,
  }));

const finishAssistantMessage = (
  messages: ChatMessage[],
  assistantId: string,
) =>
  updateMessageById(messages, assistantId, (message) => ({
    ...message,
    isStreaming: false,
  }));

const getResponseErrorMessage = async (response: Response) => {
  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | null;

  return payload?.error || GENERIC_CHAT_ERROR_MESSAGE;
};

const usePortfolioChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [visiblePrompts, setVisiblePrompts] = useState<string[]>(() => [
    ...starterPrompts.slice(0, 3),
  ]);

  const activeAssistantIdRef = useRef<string | null>(null);
  const tokenQueueRef = useRef<string[]>([]);
  const streamCompletedRef = useRef(false);
  const promptRotationIndexRef = useRef(3);

  useEffect(() => {
    if (input) {
      return;
    }

    let promptIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const interval = window.setInterval(() => {
      const prompt = placeholderPrompts[promptIndex];

      if (!deleting) {
        charIndex += 1;
        setPlaceholder(prompt.slice(0, charIndex));

        if (charIndex === prompt.length) {
          deleting = true;
        }

        return;
      }

      charIndex -= 1;
      setPlaceholder(prompt.slice(0, Math.max(charIndex, 0)));

      if (charIndex <= 0) {
        deleting = false;
        promptIndex = (promptIndex + 1) % placeholderPrompts.length;
      }
    }, 70);

    return () => {
      window.clearInterval(interval);
    };
  }, [input]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const assistantId = activeAssistantIdRef.current;

      if (!assistantId) {
        return;
      }

      const nextChunk = tokenQueueRef.current.splice(0, 2).join("");

      if (nextChunk) {
        setMessages((currentMessages) =>
          appendAssistantContent(currentMessages, assistantId, nextChunk),
        );
        return;
      }

      if (!streamCompletedRef.current) {
        return;
      }

      setMessages((currentMessages) =>
        finishAssistantMessage(currentMessages, assistantId),
      );
      activeAssistantIdRef.current = null;
      streamCompletedRef.current = false;
      setIsLoading(false);
    }, 18);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const submitQuestion = async (nextQuestion?: string) => {
    const question = (nextQuestion ?? input).trim();

    if (!question || isLoading) {
      return;
    }

    const nextMessages = [...messages, createChatMessage("user", question)];
    const pendingAssistantMessage = createStreamingAssistantMessage();
    const assistantId = pendingAssistantMessage.id;

    activeAssistantIdRef.current = assistantId;
    tokenQueueRef.current = [];
    streamCompletedRef.current = false;
    setMessages([...nextMessages, pendingAssistantMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(await getResponseErrorMessage(response));
      }

      await readServerSentEventStream(response.body, ({ event, data }) => {
        if (event === "token") {
          const token = JSON.parse(data) as string;
          tokenQueueRef.current.push(...Array.from(token));
          return;
        }

        if (event === "sources") {
          const sources = JSON.parse(data) as ChatSource[];
          setMessages((currentMessages) =>
            attachAssistantSources(currentMessages, assistantId, sources),
          );
          return;
        }

        if (event === "error") {
          throw new Error(JSON.parse(data) as string);
        }

        if (event === "done") {
          streamCompletedRef.current = true;
        }
      });
    } catch (submissionError) {
      activeAssistantIdRef.current = null;
      tokenQueueRef.current = [];
      streamCompletedRef.current = false;
      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== assistantId),
      );
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : GENERIC_CHAT_ERROR_MESSAGE,
      );
    } finally {
      if (!activeAssistantIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setVisiblePrompts((currentPrompts) => {
      const { prompts, nextRotationIndex } = rotateVisiblePrompts(
        currentPrompts,
        prompt,
        promptRotationIndexRef.current,
      );

      promptRotationIndexRef.current = nextRotationIndex;
      return prompts;
    });

    void submitQuestion(prompt);
  };

  return {
    messages,
    input,
    setInput,
    error,
    isLoading,
    placeholder,
    visiblePrompts,
    submitQuestion,
    handlePromptSelect,
  };
};

export default usePortfolioChat;
