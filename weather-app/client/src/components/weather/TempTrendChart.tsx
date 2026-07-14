import { motion } from 'framer-motion';
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine,
} from 'recharts';
import type { HourWeather } from '../../types/weather.types';
import { useUnitStore } from '../../store/unitStore';
import { useThemeStore } from '../../store/themeStore';
import { formatTime } from '../../utils/formatters';

interface Props {
  hours: HourWeather[];
  localtime: string;
}

interface ChartDataPoint {
  time: string;
  temp: number;
  rain: number;
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const temp = payload.find((p) => p.dataKey === 'temp')?.value;
  const rain = payload.find((p) => p.dataKey === 'rain')?.value;

  return (
    <div className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-sm border border-slate-700/50 dark:border-slate-800/80 rounded-xl px-3 py-2 text-xs text-white shadow-lg">
      <p className="font-semibold mb-1 text-slate-200">{label}</p>
      {temp !== undefined && <p className="font-medium text-sky-300">🌡 {temp}°</p>}
      {rain !== undefined && rain > 0 && <p className="text-blue-300">🌧 {rain}% rain</p>}
    </div>
  );
}

export function TempTrendChart({ hours, localtime }: Props) {
  const { unit } = useUnitStore();
  const { theme } = useThemeStore();

  const cityNow = new Date(localtime).getTime();
  const data: ChartDataPoint[] = hours
    .filter((h) => new Date(h.time).getTime() >= cityNow - 60 * 60 * 1000)
    .slice(0, 24)
    .map((h) => ({
      time: formatTime(h.time),
      temp: unit === 'C' ? Math.round(h.temp_c) : Math.round(h.temp_f),
      rain: h.chance_of_rain,
    }));

  const avgTemp = Math.round(data.reduce((s, d) => s + d.temp, 0) / data.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="rounded-3xl p-5 bg-white/60 dark:bg-white/5 backdrop-blur-sm
        border border-white/50 dark:border-white/10 shadow-sm dark:shadow-none"
    >
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
        24-Hour Temperature Trend
      </h2>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: theme === 'dark' ? '#94a3b8' : '#64748b' }}
              axisLine={false}
              tickLine={false}
              interval={3}
            />
            <YAxis
              tick={{ fontSize: 11, fill: theme === 'dark' ? '#94a3b8' : '#64748b' }}
              axisLine={false}
              tickLine={false}
              unit="°"
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={avgTemp} stroke={theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} strokeDasharray="4 4" />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="var(--color-accent)"
              strokeWidth={2.5}
              fill="url(#tempGrad)"
              dot={false}
              activeDot={{ r: 5, fill: 'var(--color-accent)', stroke: 'var(--color-bg-surface)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
