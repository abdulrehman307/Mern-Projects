import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import type { WeatherData } from '../../types/weather.types';
import { useUnitStore } from '../../store/unitStore';
import { getWeatherTheme, formatDateTime } from '../../utils/formatters';
import { FavoriteButton } from '../favorites/FavoriteButton';

interface Props {
  data: WeatherData;
}

export function CurrentWeatherCard({ data }: Props) {
  const { unit } = useUnitStore();
  const { location, current } = data;
  const theme = getWeatherTheme(current.condition.code, current.is_day);

  const temp = unit === 'C' ? Math.round(current.temp_c) : Math.round(current.temp_f);
  const feelsLike = unit === 'C' ? Math.round(current.feelslike_c) : Math.round(current.feelslike_f);
  const unit_label = unit === 'C' ? '°C' : '°F';

  // Condition color tokens mapped from formatters WeatherTheme
  const condBadgeColors: Record<typeof theme, string> = {
    sunny: 'bg-cond-sunny/10 text-cond-sunny border-cond-sunny/20',
    cloudy: 'bg-cond-cloudy/10 text-cond-cloudy border-cond-cloudy/20',
    rainy: 'bg-cond-rainy/10 text-cond-rainy border-cond-rainy/20',
    snowy: 'bg-cond-snowy/10 text-cond-snowy border-cond-snowy/20',
    stormy: 'bg-cond-stormy/10 text-cond-stormy border-cond-stormy/20',
    foggy: 'bg-cond-foggy/10 text-cond-foggy border-cond-foggy/20',
    night: 'bg-accent/10 text-accent border-accent/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl p-6 md:p-8
        bg-bg-surface/60 backdrop-blur-xl border border-border
        shadow-xl shadow-slate-200/20 dark:shadow-none"
    >
      {/* Decorative Weather Accent Light Glow */}
      <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none
        ${theme === 'sunny' ? 'bg-cond-sunny' : ''}
        ${theme === 'rainy' ? 'bg-cond-rainy' : ''}
        ${theme === 'cloudy' ? 'bg-cond-cloudy' : ''}
        ${theme === 'snowy' ? 'bg-cond-snowy' : ''}
        ${theme === 'stormy' ? 'bg-cond-stormy' : ''}
        ${theme === 'foggy' ? 'bg-cond-foggy' : ''}
        ${theme === 'night' ? 'bg-accent' : ''}
      `} />

      {/* Header row */}
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-primary mb-1">
            <MapPin className="w-4 h-4 shrink-0 text-text-secondary" />
            <span className="text-sm font-bold tracking-tight">
              {location.name}, {location.country}
            </span>
          </div>
          {location.region && (
            <p className="text-xs text-text-secondary ml-6">{location.region}</p>
          )}
        </div>
        <FavoriteButton location={location} />
      </div>

      {/* Temperature hero */}
      <div className="relative flex items-center gap-6 mt-8">
        <div>
          <motion.p
            key={`${temp}${unit}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-7xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-text-primary via-text-primary to-text-secondary leading-none"
          >
            {temp}
            <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-text-primary to-text-secondary ml-1 select-none">
              {unit_label}
            </span>
          </motion.p>
          <p className="mt-2 text-sm text-text-secondary">
            Feels like <span className="font-semibold text-text-primary">{feelsLike}{unit_label}</span>
          </p>
        </div>

        {/* Condition icon */}
        <div className="ml-auto shrink-0">
          <img
            src={`https:${current.condition.icon.replace('64x64', '128x128')}`}
            alt={current.condition.text}
            className="w-24 h-24 md:w-32 md:h-32 drop-shadow-lg"
          />
        </div>
      </div>

      {/* Condition + timestamp */}
      <div className="relative mt-6 flex items-center justify-between flex-wrap gap-3 border-t border-border/60 pt-4">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${condBadgeColors[theme]}`}>
            {current.condition.text}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated {formatDateTime(current.last_updated)}</span>
        </div>
      </div>
    </motion.div>
  );
}
