type Props = {
  prompts: string[];
  onSelect: (prompt: string) => void;
};

const SuggestedPrompts = ({ prompts, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-left text-sm text-gray-700 transition hover:border-gray-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-white/20 dark:hover:bg-white/10"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default SuggestedPrompts;
