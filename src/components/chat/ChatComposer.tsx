import { FormEvent } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

const ChatComposer = ({ value, onChange, onSubmit, isLoading }: Props) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-white/10 bg-[#111113]/95 p-3 shadow-2xl backdrop-blur">
      <label className="sr-only" htmlFor="portfolio-question">
        Ask about Nasanjargal Binderiya
      </label>
      <div className="flex items-end gap-3">
        <textarea
          id="portfolio-question"
          value={value}
          rows={1}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ask about experience, projects, skills, or how to get in touch"
          className="max-h-40 min-h-[56px] flex-1 resize-y border-0 bg-transparent px-3 py-3 text-sm text-gray-100 outline-none placeholder:text-gray-500"
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="inline-flex h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-gray-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </div>
    </form>
  );
};

export default ChatComposer;
