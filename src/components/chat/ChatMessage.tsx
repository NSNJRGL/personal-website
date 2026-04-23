import ChatSources from "./ChatSources";
import type { ChatMessage as ChatMessageType } from "./types";

type Props = {
  message: ChatMessageType;
};

const ChatMessage = ({ message }: Props) => {
  const isAssistant = message.role === "assistant";

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
    <article className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={[
          "max-w-[90%] px-4 py-3 sm:max-w-[80%]",
          isAssistant
            ? "text-gray-200"
            : "rounded-3xl bg-[#1b1b1d] text-white shadow-sm",
        ].join(" ")}
      >
        <div className="mb-2 text-[11px] uppercase tracking-[0.2em] opacity-60">
          {isAssistant ? "Nasaa AI" : "You"}
        </div>
        <div className="space-y-3">
          {message.content.split("\n").map((paragraph) => (
            <p key={`${message.id}-${paragraph}`} className="whitespace-pre-wrap text-[15px] leading-8 sm:text-[17px]">
              {renderInline(paragraph)}
            </p>
          ))}
        </div>
        {isAssistant && message.sources ? <ChatSources sources={message.sources} /> : null}
      </div>
    </article>
  );
};

export default ChatMessage;
