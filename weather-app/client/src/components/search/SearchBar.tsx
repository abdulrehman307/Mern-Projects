import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { useCitySearch } from '../../hooks/useWeather';
import { useDebounce } from '../../hooks/useDebounce';
import { CitySuggestions } from './CitySuggestions';
import { DEBOUNCE_DELAY_MS } from '../../utils/constants';

interface Props {
  onSearch: (city: string) => void;
  initialValue?: string;
}

export function SearchBar({ onSearch, initialValue = '' }: Props) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedInput = useDebounce(inputValue, DEBOUNCE_DELAY_MS);
  const { data: suggestions = [], isLoading } = useCitySearch(
    isOpen && inputValue.length >= 2 ? debouncedInput : ''
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      onSearch(trimmed);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  function handleSelect(cityName: string) {
    setInputValue(cityName);
    onSearch(cityName);
    setIsOpen(false);
  }

  function handleClear() {
    setInputValue('');
    setIsOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="city-search" className="sr-only">Search for a city</label>
        <div className="relative flex items-center">
          {/* Search icon */}
          <div className="absolute left-4 pointer-events-none">
            {isLoading
              ? <Loader2 className="w-5 h-5 text-accent animate-spin" />
              : <Search className="w-5 h-5 text-text-secondary" />
            }
          </div>

          <input
            id="city-search"
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            placeholder="Search city..."
            autoComplete="off"
            className="w-full pl-12 pr-12 py-3 rounded-xl text-sm
              bg-bg-elevated border border-border
              text-text-primary placeholder-text-secondary
              focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
              transition-all duration-200 shadow-sm dark:shadow-none"
          />

          {/* Clear button */}
          {inputValue && (
            <button
              type="button"
              id="search-clear"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-4 p-1 rounded-full text-text-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <CitySuggestions
            suggestions={suggestions}
            query={inputValue}
            onSelect={handleSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
