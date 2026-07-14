import { motion } from 'framer-motion';
import { Droplets, Wind, Gauge, Eye, Thermometer, Zap } from 'lucide-react';
import type { CurrentWeather } from '../../types/weather.types';
import { useUnitStore } from '../../store/unitStore';
import { uvLabel } from '../../utils/formatters';

interface Props {
  current: CurrentWeather;
}

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  id: string;
  colorClass: string;
}

export function WeatherStatsGrid({ current }: Props) {
  const { unit } = useUnitStore();

  const stats: StatItem[] = [
    {
      id: 'feelslike',
      icon: <Thermometer className="w-4 h-4" />,
      label: 'Feels Like',
      value: unit === 'C' ? `${Math.round(current.feelslike_c)}°C` : `${Math.round(current.feelslike_f)}°F`,
      colorClass: 'bg-cond-snowy/10 text-cond-snowy',
    },
    {
      id: 'wind',
      icon: <Wind className="w-4 h-4" />,
      label: 'Wind Speed',
      value: unit === 'C'
        ? `${Math.round(current.wind_kph)} km/h`
        : `${Math.round(current.wind_mph)} mph`,
      colorClass: 'bg-accent/10 text-accent',
    },
    {
      id: 'humidity',
      icon: <Droplets className="w-4 h-4" />,
      label: 'Humidity',
      value: `${current.humidity}%`,
      colorClass: 'bg-cond-rainy/10 text-cond-rainy',
    },
    {
      id: 'uv',
      icon: <Zap className="w-4 h-4" />,
      label: 'UV Index',
      value: `${current.uv} (${uvLabel(current.uv)})`,
      colorClass: 'bg-cond-sunny/10 text-cond-sunny',
    },
    {
      id: 'pressure',
      icon: <Gauge className="w-4 h-4" />,
      label: 'Pressure',
      value: `${current.pressure_mb} mb`,
      colorClass: 'bg-cond-stormy/10 text-cond-stormy',
    },
    {
      id: 'visibility',
      icon: <Eye className="w-4 h-4" />,
      label: 'Visibility',
      value: unit === 'C' ? `${current.vis_km} km` : `${current.vis_miles} mi`,
      colorClass: 'bg-cond-foggy/10 text-cond-foggy',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3.5">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.id}
          id={`stat-${stat.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * i, duration: 0.3 }}
          className="flex flex-col justify-between gap-3 p-4 rounded-xl
            bg-bg-surface border border-border
            hover:border-text-secondary/30 transition-all duration-200
            shadow-sm dark:shadow-none"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs font-semibold text-text-secondary leading-tight">{stat.label}</span>
            <div className={`p-1.5 rounded-lg ${stat.colorClass} shrink-0`}>
              {stat.icon}
            </div>
          </div>
          <p className="text-sm font-bold text-text-primary tracking-tight mt-1">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
