import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';
import type { ForecastDay } from '../../types/weather.types';
import { useUnitStore } from '../../store/unitStore';
import { formatForecastDay, formatFullDate } from '../../utils/formatters';

interface Props {
  forecastDays: ForecastDay[];
}

export function DailyForecast({ forecastDays }: Props) {
  const { unit } = useUnitStore();

  // Find absolute min and max temperatures across the entire forecast week for the range bar
  const temps = forecastDays.map((d) => ({
    min: unit === 'C' ? d.day.mintemp_c : d.day.mintemp_f,
    max: unit === 'C' ? d.day.maxtemp_c : d.day.maxtemp_f,
  }));

  const absoluteMin = Math.min(...temps.map((t) => t.min));
  const absoluteMax = Math.max(...temps.map((t) => t.max));
  const rangeSpan = absoluteMax - absoluteMin;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4 }}
      className="rounded-3xl p-5 bg-bg-surface border border-border shadow-sm dark:shadow-none"
    >
      <h2 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-4">
        {forecastDays.length}-Day Forecast
      </h2>

      {/* Grid layout - horizontal cards on desktop, responsive stack/wrap on smaller screens */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3.5" role="list" aria-label="Daily forecast">
        {forecastDays.map((day, i) => {
          const maxTemp = unit === 'C' ? Math.round(day.day.maxtemp_c) : Math.round(day.day.maxtemp_f);
          const minTemp = unit === 'C' ? Math.round(day.day.mintemp_c) : Math.round(day.day.mintemp_f);
          const isToday = i === 0;

          // Range bar calculation
          const startPercent = rangeSpan > 0 ? ((minTemp - absoluteMin) / rangeSpan) * 100 : 0;
          const widthPercent = rangeSpan > 0 ? ((maxTemp - minTemp) / rangeSpan) * 100 : 100;

          return (
            <motion.div
              key={day.date}
              role="listitem"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              title={formatFullDate(day.date)}
              className="flex flex-col items-center justify-between p-3.5 rounded-xl
                bg-bg-elevated/55 border border-border/80 hover:border-text-secondary/25
                transition-all duration-200 cursor-default shadow-sm dark:shadow-none text-center"
            >
              {/* Day label */}
              <span className={`text-xs font-bold tracking-tight ${isToday ? 'text-accent' : 'text-text-primary'}`}>
                {isToday ? 'Today' : formatForecastDay(day.date_epoch)}
              </span>

              {/* Weather icon */}
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="w-10 h-10 select-none my-1"
                draggable={false}
              />

              {/* Rain indicator (if high chance) */}
              <div className="h-4 flex items-center justify-center my-0.5">
                {day.day.daily_chance_of_rain > 20 && (
                  <div className="flex items-center gap-0.5 text-[10px] font-bold text-cond-rainy">
                    <Droplets className="w-2.5 h-2.5" />
                    {day.day.daily_chance_of_rain}%
                  </div>
                )}
              </div>

              {/* Mini Range Bar */}
              <div className="w-full mt-2.5 space-y-1">
                {/* Min / Max labels */}
                <div className="flex items-center justify-between text-[10px] font-bold text-text-secondary">
                  <span>{minTemp}°</span>
                  <span>{maxTemp}°</span>
                </div>
                {/* Bar track */}
                <div className="relative w-full h-1 bg-bg-base/70 dark:bg-bg-base/40 border border-border/40 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-500 dark:to-indigo-500 rounded-full"
                    style={{ left: `${startPercent}%`, width: `${widthPercent}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
