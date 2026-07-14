import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useSearchHistory } from '../../hooks/useWeather';

interface Props {
  onSelect: (city: string) => void;
}

export function RecentSearches({ onSelect }: Props) {
  const { data: history = [] } = useSearchHistory();

  if (history.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="flex flex-wrap gap-2 justify-center"
      >
        <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-text-secondary self-center">
          <Clock className="w-3.5 h-3.5" />
          Recent:
        </span>
        {history.slice(0, 6).map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg
              bg-bg-elevated border border-border hover:bg-bg-surface
              text-text-secondary hover:text-text-primary hover:border-text-secondary/40
              transition-all duration-200 hover:scale-105 shadow-sm dark:shadow-none cursor-pointer"
          >
            {q}
          </button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
