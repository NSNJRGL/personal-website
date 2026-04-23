import { FormEvent, KeyboardEvent } from "react";

type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

const ChatComposer = ({ value, placeholder, onChange, onSubmit, isLoading }: Props) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.1rem] border border-white/10 bg-[#111113]/95 px-3 py-1.5 shadow-2xl backdrop-blur">
      <label className="sr-only" htmlFor="portfolio-question">
        Ask about Nasanjargal Binderiya
      </label>
      <div className="flex items-center gap-3">
        <textarea
          id="portfolio-question"
          value={value}
          rows={1}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="max-h-28 min-h-[36px] flex-1 resize-none border-0 bg-transparent px-3 py-1.5 text-sm text-gray-100 outline-none placeholder:text-gray-500"
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          aria-label={isLoading ? "Generating response" : "Send message"}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] bg-white text-gray-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path
                className="opacity-90"
                d="M22 12a10 10 0 00-10-10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 12L20 4L14 20L11 13L4 12Z"
                fill="currentColor"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatComposer;
