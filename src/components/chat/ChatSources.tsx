import type { ChatSource } from "./types";

type Props = {
  sources: ChatSource[];
};

const labelByType: Record<ChatSource["type"], string> = {
  profile: "Profile",
  experience: "Experience",
  project: "Project",
  skills: "Skills",
  links: "Links",
  faq: "FAQ",
};

const ChatSources = ({ sources }: Props) => {
  if (!sources.length) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {sources.map((source) => {
        const content = (
          <>
            <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
              {labelByType[source.type]}
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-200">{source.title}</span>
          </>
        );

        if (source.url) {
          return (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-white/20 hover:bg-white/10"
            >
              <span className="flex flex-col">{content}</span>
            </a>
          );
        }

        return (
          <div
            key={source.id}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
          >
            <span className="flex flex-col">{content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatSources;
