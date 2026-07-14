import { motion, AnimatePresence } from 'framer-motion';
import type { WeatherTheme } from '../../utils/formatters';

interface Props {
  theme: WeatherTheme;
}

const condGlowColors: Record<WeatherTheme, string> = {
  sunny: 'from-cond-sunny/20 to-transparent',
  cloudy: 'from-cond-cloudy/25 to-transparent',
  rainy: 'from-cond-rainy/20 to-transparent',
  snowy: 'from-cond-snowy/20 to-transparent',
  stormy: 'from-cond-stormy/25 to-transparent',
  foggy: 'from-cond-foggy/20 to-transparent',
  night: 'from-accent/15 to-transparent',
};

export function WeatherBackground({ theme }: Props) {
  return (
    <div className="fixed inset-0 -z-10 bg-bg-base transition-colors duration-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
          className="absolute inset-0 overflow-hidden"
        >
          {/* Top-Right Soft Ambient Weather Glow */}
          <div
            className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-radial blur-3xl opacity-60 dark:opacity-40 pointer-events-none ${condGlowColors[theme]}`}
          />

          {/* Bottom-Left Soft Accent Glow */}
          <div
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-radial from-accent/10 to-transparent blur-3xl opacity-40 dark:opacity-20 pointer-events-none"
          />

          {/* Floating animated orbs for subtle depth */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], x: [0, 15, 0], y: [0, 10, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-accent/5 blur-3xl pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
