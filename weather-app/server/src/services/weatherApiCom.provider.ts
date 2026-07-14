import axios, { AxiosInstance } from 'axios';
import { WeatherProvider } from './weatherProvider.service';
import { WeatherData, CitySearchResult } from '../types/weather.types';
import { env } from '../config/env';

/**
 * WeatherApiComProvider — concrete implementation of WeatherProvider
 * that calls WeatherAPI.com (https://www.weatherapi.com/).
 *
 * This class is the ONLY place in the codebase that knows about WeatherAPI.com's
 * specific request/response shape. All other code depends on the WeatherProvider interface.
 */
export class WeatherApiComProvider implements WeatherProvider {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: env.WEATHER_API_BASE_URL,
      params: { key: env.WEATHER_API_KEY },
      timeout: 10_000,
    });
  }

  async getWeather(query: string, days = 7): Promise<WeatherData> {
    const { data } = await this.client.get<WeatherData>('/forecast.json', {
      params: { q: query, days, aqi: 'no', alerts: 'no' },
    });
    return data;
  }

  async searchCities(query: string): Promise<CitySearchResult[]> {
    if (query.trim().length < 2) return [];
    const { data } = await this.client.get<CitySearchResult[]>('/search.json', {
      params: { q: query },
    });
    return data;
  }
}

// Singleton instance — swap this one line to change providers globally
export const weatherProvider: WeatherProvider = new WeatherApiComProvider();
