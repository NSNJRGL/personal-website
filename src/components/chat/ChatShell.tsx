import { useEffect, useMemo, useRef, useState } from "react";
import ToggleButton from "src/components/ToggleButton";
import type { PortfolioLinkSet } from "src/lib/portfolio";
import ChatComposer from "./ChatComposer";
import ChatMessage from "./ChatMessage";
import SuggestedPrompts from "./SuggestedPrompts";
import type { ChatMessage as ChatMessageType, ChatSource } from "./types";

type Props = {
  name: string;
  headline: string;
  shortBio: string;
  focus: string[];
  links: PortfolioLinkSet;
};

const starterPrompts = [
  "What kind of engineer is Nasanjargal?",
  "Tell me about his performance optimization work.",
  "What technologies has he used recently?",
  "How can I contact him?",
  "Is he open to freelance work?",
  "What did he build at Thermo Fisher Scientific?",
  "What AI-assisted workflows does he use?",
  "What backend technologies does he use?",
  "What performance results has he achieved?",
];

const placeholderPrompts = [
  "Ask about his recent projects",
  "What does he optimize most often?",
  "How can I hire or contact him?",
  "Which technologies does he use?",
];

const createMessage = (
  role: ChatMessageType["role"],
  content: string,
  sources?: ChatSource[],
): ChatMessageType => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
  createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
  sources,
});

const ChatShell = ({ name, headline, shortBio, focus, links }: Props) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [visiblePrompts, setVisiblePrompts] = useState(() => starterPrompts.slice(0, 3));
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const activeAssistantIdRef = useRef<string | null>(null);
  const tokenQueueRef = useRef<string[]>([]);
  const streamCompletedRef = useRef(false);
  const promptRotationIndexRef = useRef(3);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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

      if (!assistantId || tokenQueueRef.current.length === 0) {
        if (assistantId && streamCompletedRef.current) {
          setMessages((currentMessages) =>
            currentMessages.map((message) =>
              message.id === assistantId ? { ...message, isStreaming: false } : message,
            ),
          );
          activeAssistantIdRef.current = null;
          streamCompletedRef.current = false;
          setIsLoading(false);
        }

        return;
      }

      const nextChunk = tokenQueueRef.current.splice(0, 2).join("");
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === assistantId
            ? { ...message, content: `${message.content}${nextChunk}` }
            : message,
        ),
      );
    }, 18);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const quickLinks = useMemo(
    () =>
      [
        { label: "Resume", href: links.resume },
        { label: "GitHub", href: links.github },
        { label: "LinkedIn", href: links.linkedin },
        { label: "V1", href: links.portfolioV1 },
      ].filter((item): item is { label: string; href: string } => Boolean(item.href)),
    [links.github, links.linkedin, links.portfolioV1, links.resume],
  );

  const submitQuestion = async (nextQuestion?: string) => {
    const question = (nextQuestion || input).trim();
    if (!question || isLoading) {
      return;
    }

    const nextMessages = [...messages, createMessage("user", question)];
    const assistantId = `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    activeAssistantIdRef.current = assistantId;
    tokenQueueRef.current = [];
    streamCompletedRef.current = false;
    setMessages([
      ...nextMessages,
      {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        isStreaming: true,
      },
    ]);
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
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Something went wrong while generating the answer.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const handleEvent = (eventName: string, data: string) => {
        if (eventName === "token") {
          const token = JSON.parse(data) as string;
          tokenQueueRef.current.push(...Array.from(token));
        }

        if (eventName === "sources") {
          const sources = JSON.parse(data) as ChatSource[];
          setMessages((currentMessages) =>
            currentMessages.map((message) =>
              message.id === assistantId ? { ...message, sources } : message,
            ),
          );
        }

        if (eventName === "error") {
          const message = JSON.parse(data) as string;
          throw new Error(message);
        }

        if (eventName === "done") {
          streamCompletedRef.current = true;
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const eventBlock of events) {
          const eventLine = eventBlock
            .split("\n")
            .find((line) => line.startsWith("event:"));
          const dataLine = eventBlock
            .split("\n")
            .find((line) => line.startsWith("data:"));

          if (!eventLine || !dataLine) {
            continue;
          }

          handleEvent(eventLine.replace("event:", "").trim(), dataLine.replace("data:", "").trim());
        }
      }

      if (buffer.trim()) {
        const eventLine = buffer.split("\n").find((line) => line.startsWith("event:"));
        const dataLine = buffer.split("\n").find((line) => line.startsWith("data:"));

        if (eventLine && dataLine) {
          handleEvent(eventLine.replace("event:", "").trim(), dataLine.replace("data:", "").trim());
        }
      }
    } catch (submissionError) {
      activeAssistantIdRef.current = null;
      tokenQueueRef.current = [];
      streamCompletedRef.current = false;
      setMessages((currentMessages) => currentMessages.filter((message) => message.id !== assistantId));
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while generating the answer.",
      );
    } finally {
      if (!activeAssistantIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setVisiblePrompts((currentPrompts) => {
      if (starterPrompts.length <= currentPrompts.length) {
        return currentPrompts;
      }

      let replacement = prompt;
      let attempts = 0;

      while (attempts < starterPrompts.length) {
        const candidate = starterPrompts[promptRotationIndexRef.current % starterPrompts.length];
        promptRotationIndexRef.current += 1;
        attempts += 1;

        if (!currentPrompts.includes(candidate)) {
          replacement = candidate;
          break;
        }
      }

      return currentPrompts.map((currentPrompt) =>
        currentPrompt === prompt ? replacement : currentPrompt,
      );
    });

    void submitQuestion(prompt);
  };

  return (
    <div className="h-screen overflow-y-auto bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <div className="mx-auto flex min-h-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 -mx-4 flex items-center justify-between gap-4 bg-white/80 px-4 pb-4 pt-5 text-xs text-gray-500 backdrop-blur dark:bg-black/80 dark:text-gray-400 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-[0.18em] text-gray-900 dark:text-gray-100">N/A</span>
          </div>
          <div className="flex items-center gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="hidden text-xs text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white sm:inline-flex"
              >
                {link.label}
              </a>
            ))}
            <ToggleButton />
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
          <div className="flex-1 space-y-7 pb-10 pt-8">
            {messages.length === 0 ? (
              <div className="pt-10 sm:pt-16">
                <div className="mb-8 text-xs uppercase tracking-[0.28em] text-gray-500 dark:text-gray-500">Thought for a moment</div>
                <h1 className="max-w-2xl text-2xl font-medium leading-tight text-gray-900 dark:text-white sm:text-4xl">
                  Ask {name} through a chat-native portfolio.
                </h1>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                  {shortBio}
                </p>
                <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                  Focused on {focus.join(", ")}. Ask about experience, projects, skills, interests, or how to get in touch.
                </p>
              </div>
            ) : (
              messages.map((message) => <ChatMessage key={message.id} message={message} />)
            )}

            {error ? (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}
            <div ref={bottomRef} />
          </div>

          <div className="sticky bottom-0 mt-auto bg-gradient-to-t from-white via-white/95 to-transparent pb-6 pt-4 backdrop-blur dark:from-black dark:via-black/95">
            <div className="mb-4">
              <SuggestedPrompts prompts={visiblePrompts} onSelect={handlePromptSelect} />
            </div>
            <ChatComposer
              value={input}
              placeholder={placeholder}
              onChange={setInput}
              onSubmit={() => submitQuestion()}
              isLoading={isLoading}
            />
            <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-500">
              Answers are grounded in resume, project, and profile data. AI may still make mistakes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatShell;
