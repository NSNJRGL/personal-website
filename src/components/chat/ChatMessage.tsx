import { motion } from "framer-motion";
import type { ChatMessage as ChatMessageType } from "./types";

type Props = {
  message: ChatMessageType;
};

const ChatMessage = ({ message }: Props) => {
  const isAssistant = message.role === "assistant";
  const timestamp = message.createdAt || new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const paragraphs = message.content ? message.content.split("\n") : [];

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`${message.id}-${index}`}>{part.slice(2, -2)}</strong>;
      }

      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={`${message.id}-${index}`}
            className="rounded bg-white/10 px-1.5 py-0.5 text-[0.95em] dark:bg-white/10"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      return part;
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`min-w-0 overflow-x-hidden flex ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {!isAssistant ? (
        <div className="max-w-[92%] sm:max-w-[82%]">
          <div className="mb-1 flex items-center justify-end gap-1.5 pr-1 text-[11px] font-medium text-gray-500 dark:text-gray-400">
            <svg className="h-3.5 w-3.5 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 7.5V12L15 13.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="leading-none">{timestamp}</span>
          </div>
          <div className="relative overflow-hidden rounded-full bg-gray-100 px-5 py-2.5 text-gray-700 shadow-sm dark:bg-[#1b1b1d] dark:text-white">
            <span
              aria-hidden="true"
              className="absolute right-0 top-2 h-3.5 w-3.5 translate-x-[35%] rounded-tr-[0.85rem] bg-gray-100 dark:bg-[#1b1b1d]"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
            />
            <div className="space-y-2">
              {paragraphs.map((paragraph) => (
                <p key={`${message.id}-${paragraph}`} className="whitespace-pre-wrap break-words text-sm leading-5">
                  {renderInline(paragraph)}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="min-w-0 w-full px-4 py-3 text-gray-700 dark:text-gray-200"
        >
          <div className="mb-2 text-[11px] uppercase tracking-[0.2em] opacity-60">
            Nas&apos;s assistant
          </div>
          <div className="space-y-3">
            {paragraphs.map((paragraph, index) => (
              <p key={`${message.id}-${paragraph}-${index}`} className="whitespace-pre-wrap break-words text-[14px] leading-7 sm:text-[15px]">
                {renderInline(paragraph)}
                {message.isStreaming && index === paragraphs.length - 1 ? (
                  <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-gray-300 align-[-0.12em]" aria-hidden="true" />
                ) : null}
              </p>
            ))}
            {message.isStreaming && paragraphs.length === 0 ? (
              <p className="text-[14px] leading-7 sm:text-[15px]">
                <span className="inline-block h-[1em] w-[2px] animate-pulse bg-gray-300 align-[-0.12em]" aria-hidden="true" />
              </p>
            ) : null}
          </div>
        </div>
      )}
    </motion.article>
  );
};

export default ChatMessage;
