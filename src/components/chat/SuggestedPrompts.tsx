type Props = {
  prompts: string[];
  onSelect: (prompt: string) => void;
};

const SuggestedPrompts = ({ prompts, onSelect }: Props) => {
  return (
    <div className="scrollbar-chrome overflow-x-auto pb-1">
      <div className="flex min-w-max flex-nowrap gap-2.5">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSelect(prompt)}
            className="flex-none whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-left text-sm text-gray-200 transition hover:border-white/20 hover:bg-white/10"
            title={prompt}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
