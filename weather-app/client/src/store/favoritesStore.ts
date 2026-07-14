import { create } from 'zustand';
import type { FavoriteCity } from '../types/weather.types';

interface FavoritesStore {
  favorites: FavoriteCity[];
  setFavorites: (favs: FavoriteCity[]) => void;
  addFavoriteLocal: (fav: FavoriteCity) => void;
  removeFavoriteLocal: (id: string) => void;
  isFavorite: (name: string, country: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  setFavorites: (favorites) => set({ favorites }),

  addFavoriteLocal: (fav) =>
    set((s) => ({
      favorites: s.favorites.some((f) => f._id === fav._id)
        ? s.favorites
        : [fav, ...s.favorites],
    })),

  removeFavoriteLocal: (id) =>
    set((s) => ({ favorites: s.favorites.filter((f) => f._id !== id) })),

  isFavorite: (name, country) =>
    get().favorites.some(
      (f) => f.name.toLowerCase() === name.toLowerCase() && f.country === country
    ),
}));
