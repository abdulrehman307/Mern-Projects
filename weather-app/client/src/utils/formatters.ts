import { format, parseISO, fromUnixTime } from 'date-fns';
import { SUNNY_CODES, CLOUDY_CODES, RAINY_CODES, SNOWY_CODES, STORMY_CODES, FOGGY_CODES } from './constants';

/** Format a date-time string from WeatherAPI.com */
export function formatDateTime(dateStr: string): string {
  return format(parseISO(dateStr), 'EEE, MMM d · h:mm a');
}

/** Format just the time from a datetime string */
export function formatTime(dateStr: string): string {
  return format(parseISO(dateStr), 'h a');
}

/** Format a forecast date (epoch seconds) to "Mon", "Tue", etc. */
export function formatForecastDay(epochOrDate: number | string): string {
  if (typeof epochOrDate === 'number') {
    return format(fromUnixTime(epochOrDate), 'EEE');
  }
  return format(parseISO(epochOrDate), 'EEE');
}

/** Format a full date string e.g. "Monday, July 13" */
export function formatFullDate(dateStr: string): string {
  return format(parseISO(dateStr), 'EEEE, MMMM d');
}

/** Convert kph to mph */
export function kphToMph(kph: number): number {
  return Math.round(kph * 0.621371);
}

/** Round to one decimal */
export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export type WeatherTheme = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy' | 'night';

/** Determine a visual theme from condition code + is_day flag */
export function getWeatherTheme(conditionCode: number, isDay: number): WeatherTheme {
  if (!isDay) return 'night';
  if (STORMY_CODES.includes(conditionCode)) return 'stormy';
  if (RAINY_CODES.includes(conditionCode)) return 'rainy';
  if (SNOWY_CODES.includes(conditionCode)) return 'snowy';
  if (FOGGY_CODES.includes(conditionCode)) return 'foggy';
  if (CLOUDY_CODES.includes(conditionCode)) return 'cloudy';
  if (SUNNY_CODES.includes(conditionCode)) return 'sunny';
  return 'cloudy'; // default
}

/** Returns a Tailwind gradient class string based on weather theme */
export function getThemeGradient(theme: WeatherTheme): string {
  const gradients: Record<WeatherTheme, string> = {
    sunny:   'from-amber-400 via-orange-300 to-yellow-200',
    cloudy:  'from-slate-500 via-slate-400 to-blue-200',
    rainy:   'from-slate-700 via-blue-700 to-blue-400',
    snowy:   'from-blue-100 via-slate-200 to-indigo-100',
    stormy:  'from-gray-900 via-slate-700 to-purple-900',
    foggy:   'from-gray-400 via-gray-300 to-slate-200',
    night:   'from-indigo-950 via-slate-900 to-blue-950',
  };
  return gradients[theme];
}

/** Wind direction abbreviation → full text */
export function windDirFull(dir: string): string {
  const map: Record<string, string> = {
    N: 'North', NNE: 'NNE', NE: 'Northeast', ENE: 'ENE',
    E: 'East', ESE: 'ESE', SE: 'Southeast', SSE: 'SSE',
    S: 'South', SSW: 'SSW', SW: 'Southwest', WSW: 'WSW',
    W: 'West', WNW: 'WNW', NW: 'Northwest', NNW: 'NNW',
  };
  return map[dir] ?? dir;
}

/** UV index to label */
export function uvLabel(uv: number): string {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
}
