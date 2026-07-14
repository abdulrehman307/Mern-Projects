import { motion } from 'framer-motion';
import { AlertTriangle, WifiOff, SearchX, RefreshCw } from 'lucide-react';

type ErrorKind = 'not-found' | 'network' | 'rate-limit' | 'unknown';

function detectErrorKind(message: string): ErrorKind {
  const lower = message.toLowerCase();
  if (lower.includes('not found')) return 'not-found';
  if (lower.includes('rate limit') || lower.includes('429')) return 'rate-limit';
  if (lower.includes('network') || lower.includes('econnrefused') || lower.includes('failed to fetch')) return 'network';
  return 'unknown';
}

interface Props {
  error: Error;
  onRetry?: () => void;
  query?: string;
}

export function ErrorState({ error, onRetry, query }: Props) {
  const kind = detectErrorKind(error.message);

  const configs = {
    'not-found': {
      icon: <SearchX className="w-8 h-8 text-cond-sunny" />,
      title: 'City not found',
      description: query
        ? `We couldn't find weather data for "${query}". Check the spelling or try a different city.`
        : 'The city you searched for could not be found.',
      colorClass: 'bg-cond-sunny/10 border-cond-sunny/20',
    },
    'network': {
      icon: <WifiOff className="w-8 h-8 text-cond-rainy" />,
      title: 'Connection error',
      description: 'Unable to reach the weather service. Check your connection and try again.',
      colorClass: 'bg-cond-rainy/10 border-cond-rainy/20',
    },
    'rate-limit': {
      icon: <AlertTriangle className="w-8 h-8 text-cond-stormy" />,
      title: 'Rate limit reached',
      description: 'Too many requests. Please wait a moment and try again.',
      colorClass: 'bg-cond-stormy/10 border-cond-stormy/20',
    },
    'unknown': {
      icon: <AlertTriangle className="w-8 h-8 text-text-secondary" />,
      title: 'Something went wrong',
      description: error.message,
      colorClass: 'bg-bg-elevated border-border',
    },
  } as const;

  const config = configs[kind];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-5 p-8 rounded-3xl
        bg-bg-surface border border-border text-center shadow-sm max-w-md mx-auto"
    >
      <div className={`p-3.5 rounded-xl border ${config.colorClass}`}>{config.icon}</div>
      <div>
        <h2 className="text-lg font-bold text-text-primary mb-1.5">{config.title}</h2>
        <p className="text-sm text-text-secondary max-w-xs leading-relaxed">{config.description}</p>
      </div>
      {onRetry && (
        <button
          id="error-retry"
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
            bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-[1.03]
            shadow-md shadow-accent/20 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      )}
    </motion.div>
  );
}
