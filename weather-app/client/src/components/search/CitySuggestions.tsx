import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { CitySearchResult } from '../../types/weather.types';

interface Props {
  suggestions: CitySearchResult[];
  query: string;
  onSelect: (city: string) => void;
}

export function CitySuggestions({ suggestions, query, onSelect }: Props) {
  return (
    <motion.ul
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      role="listbox"
      aria-label="City suggestions"
      className="absolute top-full mt-2 w-full z-50 rounded-xl overflow-hidden
        bg-bg-surface border border-border
        shadow-xl shadow-slate-200/40 dark:shadow-black/60"
    >
      {suggestions.map((city) => {
        const display = `${city.name}, ${city.country}`;
        // Bold the matching part of the city name
        const idx = city.name.toLowerCase().indexOf(query.toLowerCase());
        const before = city.name.slice(0, idx);
        const match = city.name.slice(idx, idx + query.length);
        const after = city.name.slice(idx + query.length);

        return (
          <li key={city.id} role="option" aria-selected={false}>
            <button
              type="button"
              onClick={() => onSelect(display)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left
                hover:bg-bg-elevated transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-text-primary truncate">
                  {idx >= 0 ? (
                    <>
                      {before}
                      <span className="font-semibold text-accent">{match}</span>
                      {after}
                    </>
                  ) : city.name}
                  {city.region ? `, ${city.region}` : ''}
                </p>
                <p className="text-xs text-text-secondary">{city.country}</p>
              </div>
            </button>
          </li>
        );
      })}
    </motion.ul>
  );
}
