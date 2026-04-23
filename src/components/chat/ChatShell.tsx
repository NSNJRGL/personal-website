import { useEffect, useRef, useState } from "react";
import ToggleButton from "src/components/ToggleButton";
import type { PortfolioLinkSet } from "src/lib/portfolio";
import ChatComposer from "./ChatComposer";
import ChatMessage from "./ChatMessage";
import SuggestedPrompts from "./SuggestedPrompts";
import {
  buildQuickLinks,
  createChatMessage,
  createStreamingAssistantMessage,
  placeholderPrompts,
  rotateVisiblePrompts,
  starterPrompts,
} from "./helpers";
import { readServerSentEventStream } from "./sse";
import type { ChatMessage as ChatMessageType, ChatSource } from "./types";

type Props = {
  name: string;
  headline: string;
  shortBio: string;
  focus: string[];
  links: PortfolioLinkSet;
};

const ChatShell = ({ name, headline, shortBio, focus, links }: Props) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [visiblePrompts, setVisiblePrompts] = useState<string[]>(() => [...starterPrompts.slice(0, 3)]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const activeAssistantIdRef = useRef<string | null>(null);
  const tokenQueueRef = useRef<string[]>([]);
  const streamCompletedRef = useRef(false);
  const promptRotationIndexRef = useRef(3);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
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

      if (!assistantId) {
        return;
      }

      const nextChunk = tokenQueueRef.current.splice(0, 2).join("");

      if (nextChunk) {
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantId
              ? { ...message, content: `${message.content}${nextChunk}` }
              : message,
          ),
        );
        return;
      }

      if (!streamCompletedRef.current) {
        return;
      }

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === assistantId ? { ...message, isStreaming: false } : message,
        ),
      );
      activeAssistantIdRef.current = null;
      streamCompletedRef.current = false;
      setIsLoading(false);
    }, 18);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const quickLinks = buildQuickLinks(links);

  const submitQuestion = async (nextQuestion?: string) => {
    const question = (nextQuestion || input).trim();
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
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Something went wrong while generating the answer.");
      }

      await readServerSentEventStream(response.body, ({ event, data }) => {
        if (event === "token") {
          const token = JSON.parse(data) as string;
          tokenQueueRef.current.push(...Array.from(token));
        }

        if (event === "sources") {
          const sources = JSON.parse(data) as ChatSource[];
          setMessages((currentMessages) =>
            currentMessages.map((message) =>
              message.id === assistantId ? { ...message, sources } : message,
            ),
          );
        }

        if (event === "error") {
          const message = JSON.parse(data) as string;
          throw new Error(message);
        }

        if (event === "done") {
          streamCompletedRef.current = true;
        }
      });
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

  const showIntro = messages.length === 0;
  const focusTags = focus.slice(0, 6);

  return (
    <div className="flex h-[100svh] flex-col bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <header
        className={`sticky top-0 z-20 bg-white/80 px-4 pb-3 pt-4 text-xs text-gray-500 backdrop-blur transition-shadow dark:bg-black/80 dark:text-gray-400 sm:px-6 sm:pb-4 sm:pt-5 lg:px-8 ${
          hasScrolled ? "shadow-[0_14px_30px_-22px_rgba(15,23,42,0.28)] dark:shadow-[0_14px_30px_-22px_rgba(0,0,0,0.72)]" : "shadow-none"
        }`}
      >
        <div className="mx-auto flex max-w-[min(100%,110rem)] items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
              Portfolio AI
            </div>
            <span className="text-sm font-semibold tracking-[0.08em] text-gray-900 dark:text-gray-100">
              {name}
            </span>
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
        </div>
      </header>

      <div
        className="min-h-0 flex-1 overflow-y-auto"
        onScroll={(event) => setHasScrolled(event.currentTarget.scrollTop > 0)}
      >
        <div className="mx-auto flex min-h-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
          <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
            <div className={`flex-1 space-y-7 pt-6 sm:pt-8 ${messages.length === 0 ? "pb-8 sm:pb-10" : "pb-28 sm:pb-32"}`}>
            {showIntro ? (
              <section className="pt-4 sm:pt-16" aria-label="Portfolio introduction">
                <div className="mb-6 inline-flex rounded-full border border-gray-200 px-3 py-1 text-xs uppercase tracking-[0.24em] text-gray-500 dark:border-white/10 dark:text-gray-400 sm:mb-8">
                  {headline}
                </div>
                <h1 className="max-w-2xl text-2xl font-medium leading-tight text-gray-900 dark:text-white sm:text-4xl">
                  Ask {name} through a chat-native portfolio.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300 sm:mt-6 sm:text-base sm:leading-7">
                  {shortBio}
                </p>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-500 sm:mt-6">
                  Ask about experience, projects, skills, interests, or how to get in touch.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {focusTags.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            ) : (
              <section className="space-y-7" aria-live="polite" aria-busy={isLoading}>
                {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
              </section>
            )}

            {error ? (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-200">
                {error}
              </div>
            ) : null}
            <div ref={bottomRef} />
            </div>

            <div className="sticky bottom-0 mt-auto border-t border-gray-200/70 bg-gradient-to-t from-white via-white/95 to-transparent pb-4 pt-3 backdrop-blur dark:border-white/10 dark:from-black dark:via-black/95 sm:pb-6 sm:pt-4">
              <div className="mb-3 sm:mb-4">
                <SuggestedPrompts
                  prompts={visiblePrompts}
                  onSelect={handlePromptSelect}
                  disabled={isLoading}
                />
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default ChatShell;
