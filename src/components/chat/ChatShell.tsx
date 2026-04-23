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
];

const createMessage = (
  role: ChatMessageType["role"],
  content: string,
  sources?: ChatSource[],
): ChatMessageType => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
  sources,
});

const ChatShell = ({ name, headline, shortBio, focus, links }: Props) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
    setMessages([
      ...nextMessages,
      {
        id: assistantId,
        role: "assistant",
        content: "",
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
          setMessages((currentMessages) =>
            currentMessages.map((message) =>
              message.id === assistantId
                ? { ...message, content: `${message.content}${token}` }
                : message,
            ),
          );
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
      setMessages((currentMessages) => currentMessages.filter((message) => message.id !== assistantId));
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while generating the answer.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 pb-6 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold tracking-[0.2em] text-gray-100">NASAA AI</span>
          </div>
          <div className="flex items-center gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="hidden transition hover:text-white sm:inline-flex"
              >
                {link.label}
              </a>
            ))}
            <ToggleButton />
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
          <div className="flex-1 space-y-7 overflow-y-auto pb-32 pt-8">
            {messages.length === 0 ? (
              <div className="pt-10 sm:pt-16">
                <div className="mb-8 text-xs uppercase tracking-[0.28em] text-gray-500">Thought for a moment</div>
                <h1 className="max-w-2xl text-3xl font-medium leading-tight text-white sm:text-5xl">
                  Ask {name} through a chat-native portfolio.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
                  {shortBio}
                </p>
                <p className="mt-6 text-sm text-gray-500">
                  Focused on {focus.join(", ")}. Ask about experience, projects, skills, interests, or how to get in touch.
                </p>
                <div className="mt-8">
                  <SuggestedPrompts prompts={starterPrompts} onSelect={submitQuestion} />
                </div>
              </div>
            ) : (
              messages.map((message) => <ChatMessage key={message.id} message={message} />)
            )}

            {isLoading ? (
              <div className="text-sm text-gray-500">Streaming answer...</div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}
            <div ref={bottomRef} />
          </div>

          <div className="sticky bottom-0 mt-auto bg-gradient-to-t from-black via-black to-transparent pt-6">
            <ChatComposer
              value={input}
              onChange={setInput}
              onSubmit={() => submitQuestion()}
              isLoading={isLoading}
            />
            <p className="mt-3 text-center text-xs text-gray-500">
              Answers are grounded in resume, project, and profile data. AI may still make mistakes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatShell;
