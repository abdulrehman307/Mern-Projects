import axios from 'axios';
import { API_BASE_URL, SESSION_ID_KEY } from '../utils/constants';
import type {
  WeatherResponse,
  SearchResponse,
  HistoryResponse,
  FavoritesResponse,
  AddFavoriteResponse,
  AddFavoritePayload,
} from '../types/api.types';

/** Retrieve or skip the session ID for request headers */
function getSessionId(): string {
  return localStorage.getItem(SESSION_ID_KEY) ?? '';
}

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach session ID to every request
http.interceptors.request.use((config) => {
  const sid = getSessionId();
  if (sid) config.headers['X-Session-ID'] = sid;
  return config;
});

// ─── Weather API ─────────────────────────────────────────────────────────────

export async function fetchWeather(query: string, days = 7): Promise<WeatherResponse> {
  const { data } = await http.get<WeatherResponse>('/api/weather', {
    params: { q: query, days },
  });
  return data;
}

export async function searchCities(query: string): Promise<SearchResponse> {
  const { data } = await http.get<SearchResponse>('/api/weather/search', {
    params: { q: query },
  });
  return data;
}

export async function fetchSearchHistory(): Promise<HistoryResponse> {
  const { data } = await http.get<HistoryResponse>('/api/weather/history');
  return data;
}

// ─── Favorites API ────────────────────────────────────────────────────────────

export async function fetchFavorites(): Promise<FavoritesResponse> {
  const { data } = await http.get<FavoritesResponse>('/api/favorites');
  return data;
}

export async function addFavorite(payload: AddFavoritePayload): Promise<AddFavoriteResponse> {
  const { data } = await http.post<AddFavoriteResponse>('/api/favorites', payload);
  return data;
}

export async function removeFavorite(id: string): Promise<void> {
  await http.delete(`/api/favorites/${id}`);
}
