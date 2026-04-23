import { motion } from "framer-motion";

type Props = {
  prompts: string[];
  onSelect: (prompt: string) => void;
};

const SuggestedPrompts = ({ prompts, onSelect }: Props) => {
  return (
    <div className="scrollbar-chrome overflow-x-auto pb-1">
      <div className="flex min-w-max flex-nowrap gap-2.5">
        {prompts.map((prompt, index) => (
          <motion.button
            key={prompt}
            type="button"
            onClick={() => onSelect(prompt)}
            className="flex-none whitespace-nowrap rounded-full border border-gray-200 bg-gray-100 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:border-gray-300 hover:bg-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-white/20 dark:hover:bg-white/10"
            title={prompt}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.04, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
