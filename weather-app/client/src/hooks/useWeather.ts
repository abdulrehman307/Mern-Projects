import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchWeather,
  searchCities,
  fetchSearchHistory,
} from '../services/apiClient';
import { useDebounce } from './useDebounce';
import { DEBOUNCE_DELAY_MS, REFETCH_INTERVAL_MS } from '../utils/constants';
import type { WeatherData, CitySearchResult } from '../types/weather.types';

/**
 * Primary weather data hook.
 * Fetches weather for a given city query, with cache + stale-while-error behavior.
 */
export function useWeather(query: string) {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', query],
    queryFn: async () => {
      const res = await fetchWeather(query);
      if (!res.success) throw new Error(res.error ?? 'Failed to fetch weather');
      return res.data;
    },
    enabled: query.trim().length > 0,
    refetchInterval: REFETCH_INTERVAL_MS,
    refetchOnWindowFocus: true,
    staleTime: REFETCH_INTERVAL_MS,
    // Keep previous data visible while re-fetching
    placeholderData: (prev) => prev,
    retry: (failureCount, error) => {
      // Don't retry on 404 (city not found)
      if (error.message.toLowerCase().includes('not found')) return false;
      return failureCount < 2;
    },
  });
}

/**
 * Debounced city autocomplete search hook.
 */
export function useCitySearch(rawQuery: string) {
  const debouncedQuery = useDebounce(rawQuery, DEBOUNCE_DELAY_MS);

  return useQuery<CitySearchResult[], Error>({
    queryKey: ['city-search', debouncedQuery],
    queryFn: async () => {
      if (debouncedQuery.trim().length < 2) return [];
      const res = await searchCities(debouncedQuery);
      if (!res.success) throw new Error(res.error ?? 'Search failed');
      return res.data;
    },
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 30_000, // suggestions are valid for 30 seconds
  });
}

/**
 * Search history hook — fetches recent queries for this session.
 */
export function useSearchHistory() {
  return useQuery<string[], Error>({
    queryKey: ['search-history'],
    queryFn: async () => {
      const res = await fetchSearchHistory();
      if (!res.success) return [];
      return res.data;
    },
    staleTime: 60_000,
  });
}

/**
 * Mutation hook for invalidating weather cache on manual refresh.
 */
export function useRefreshWeather(query: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await queryClient.invalidateQueries({ queryKey: ['weather', query] });
    },
    onSuccess: () => toast.success('Weather data refreshed'),
    onError: () => toast.error('Failed to refresh weather data'),
  });
}
