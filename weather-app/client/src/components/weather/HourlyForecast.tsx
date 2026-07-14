import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';
import type { HourWeather } from '../../types/weather.types';
import { useUnitStore } from '../../store/unitStore';
import { formatTime } from '../../utils/formatters';

interface Props {
  hours: HourWeather[];
  localtime: string;
}

export function HourlyForecast({ hours, localtime }: Props) {
  const { unit } = useUnitStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Show next 24 hours relative to the city's current local time
  const cityNow = new Date(localtime).getTime();
  const upcoming = hours
    .filter((h) => new Date(h.time).getTime() >= cityNow - 60 * 60 * 1000)
    .slice(0, 24);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="relative rounded-3xl p-5 bg-bg-surface border border-border shadow-sm dark:shadow-none"
    >
      <h2 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-4">
        Hourly Forecast
      </h2>

      {/* Relative container holding the scroll-fade overlays */}
      <div className="relative">
        {/* Left scroll-fade */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-bg-surface to-transparent pointer-events-none z-10 opacity-50 dark:opacity-30" />
        
        {/* Right scroll-fade */}
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-bg-surface to-transparent pointer-events-none z-10 opacity-50 dark:opacity-30" />

        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory
            scrollbar-thin scrollbar-track-transparent"
          role="list"
          aria-label="Hourly forecast"
        >
          {upcoming.map((hour, i) => {
            const temp = unit === 'C' ? Math.round(hour.temp_c) : Math.round(hour.temp_f);
            const isNow = i === 0;

            return (
              <motion.div
                key={hour.time}
                role="listitem"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.02 * i }}
                className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-xl min-w-[68px] snap-center
                  transition-all duration-200 border cursor-default
                  ${isNow
                    ? 'bg-accent/10 border-accent/40 text-text-primary'
                    : 'bg-bg-elevated border-border text-text-primary hover:border-text-secondary/20'
                  }`}
              >
                <span className={`text-[10px] font-semibold tracking-tight ${isNow ? 'text-accent' : 'text-text-secondary'}`}>
                  {isNow ? 'Now' : formatTime(hour.time)}
                </span>
                <img
                  src={`https:${hour.condition.icon}`}
                  alt={hour.condition.text}
                  className="w-8 h-8 drop-shadow-sm select-none"
                  draggable={false}
                />
                <span className="text-sm font-bold text-text-primary">{temp}°</span>
                {hour.chance_of_rain > 20 ? (
                  <div className="flex items-center gap-0.5 text-[10px] font-medium text-cond-rainy">
                    <Droplets className="w-2.5 h-2.5" />
                    {hour.chance_of_rain}%
                  </div>
                ) : (
                  <div className="h-3.5" /> // spacing placeholder
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
