import { WeatherData, CitySearchResult } from '../types/weather.types';

/**
 * WeatherProvider — the contract every provider implementation must satisfy.
 * Controllers depend only on this interface, never on a concrete provider.
 * To swap to a different data source, create a new class implementing this interface
 * and update the binding in weatherProvider.service.ts.
 */
export interface WeatherProvider {
  /**
   * Fetch current weather + forecast for a city name or "lat,lon" string.
   * @param query - City name or "lat,lon" coordinate pair
   * @param days  - Number of forecast days (1–10)
   */
  getWeather(query: string, days?: number): Promise<WeatherData>;

  /**
   * Autocomplete / search for cities matching a partial query.
   * @param query - Partial city name
   */
  searchCities(query: string): Promise<CitySearchResult[]>;
}
