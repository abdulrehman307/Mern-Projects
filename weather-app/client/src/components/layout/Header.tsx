import { motion } from 'framer-motion';
import { Cloud, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useUnitStore } from '../../store/unitStore';
import { SearchBar } from '../search/SearchBar';

interface HeaderProps {
  onSearch: (city: string) => void;
  initialValue: string;
}

export function Header({ onSearch, initialValue }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();
  const { unit, toggleUnit } = useUnitStore();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-3.5
        bg-bg-surface/80 backdrop-blur-md border-b border-border shadow-sm"
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-accent text-accent-foreground shadow-md shadow-accent/20">
          <Cloud className="w-5 h-5" />
        </div>
        <span className="text-lg font-bold tracking-tight text-text-primary">
          Nimbus
        </span>
      </div>

      {/* Search bar inside header (center-aligned) */}
      <div className="w-full sm:max-w-xs md:max-w-md mx-auto sm:mx-0 flex-1 px-2">
        <SearchBar onSearch={onSearch} initialValue={initialValue} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Unit toggle */}
        <button
          id="unit-toggle"
          onClick={toggleUnit}
          aria-label={`Switch to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold
            bg-bg-elevated hover:bg-bg-surface text-text-secondary border border-border
            transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className={unit === 'C' ? 'text-accent font-bold' : ''}>°C</span>
          <span className="opacity-30">/</span>
          <span className={unit === 'F' ? 'text-accent font-bold' : ''}>°F</span>
        </button>

        {/* Theme toggle */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="p-2 rounded-lg bg-bg-elevated hover:bg-bg-surface border border-border
            text-text-secondary hover:text-accent transition-all duration-200
            hover:scale-110 active:scale-95 cursor-pointer"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </motion.header>
  );
}
