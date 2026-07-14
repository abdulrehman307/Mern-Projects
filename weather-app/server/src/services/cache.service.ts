import { WeatherCache } from '../models/WeatherCache.model';
import { WeatherData } from '../types/weather.types';

/**
 * Normalize a cache key: lowercase, trimmed, collapse whitespace.
 * Ensures "New York" and "new york" hit the same cache entry.
 */
export function normalizeCacheKey(query: string): string {
  return query.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Retrieve a cached WeatherData document.
 * Returns null if not found (MongoDB TTL may have expired it already).
 */
export async function getCached(query: string): Promise<WeatherData | null> {
  const key = normalizeCacheKey(query);
  const cached = await WeatherCache.findOne({ cacheKey: key }).lean();
  return cached ? (cached.data as WeatherData) : null;
}

/**
 * Store a WeatherData document in the cache.
 * Uses upsert so repeated calls for the same key refresh the TTL.
 */
export async function setCached(query: string, data: WeatherData): Promise<void> {
  const key = normalizeCacheKey(query);
  await WeatherCache.findOneAndUpdate(
    { cacheKey: key },
    { cacheKey: key, data, createdAt: new Date() },
    { upsert: true, new: true }
  );
}
