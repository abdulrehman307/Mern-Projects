import type { WeatherData, CitySearchResult, FavoriteCity } from './weather.types';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  fromCache?: boolean;
}

export type WeatherResponse = ApiResponse<WeatherData>;
export type SearchResponse = ApiResponse<CitySearchResult[]>;
export type HistoryResponse = ApiResponse<string[]>;
export type FavoritesResponse = ApiResponse<FavoriteCity[]>;
export type AddFavoriteResponse = ApiResponse<FavoriteCity>;

export interface AddFavoritePayload {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}
