import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { fetchFavorites, addFavorite, removeFavorite } from '../services/apiClient';
import { useFavoritesStore } from '../store/favoritesStore';
import type { AddFavoritePayload } from '../types/api.types';
import type { FavoriteCity } from '../types/weather.types';

/**
 * Loads favorites from the server and syncs to Zustand store.
 */
export function useFavorites() {
  const setFavorites = useFavoritesStore((s) => s.setFavorites);

  return useQuery<FavoriteCity[], Error>({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await fetchFavorites();
      if (!res.success) throw new Error(res.error ?? 'Failed to load favorites');
      setFavorites(res.data);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Mutation to add a city to favorites.
 */
export function useAddFavorite() {
  const queryClient = useQueryClient();
  const addLocal = useFavoritesStore((s) => s.addFavoriteLocal);

  return useMutation({
    mutationFn: (payload: AddFavoritePayload) => addFavorite(payload),
    onSuccess: (res) => {
      addLocal(res.data);
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success(`${res.data.name} added to favorites ⭐`);
    },
    onError: () => toast.error('Failed to add favorite'),
  });
}

/**
 * Mutation to remove a city from favorites.
 */
export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  const removeLocal = useFavoritesStore((s) => s.removeFavoriteLocal);

  return useMutation({
    mutationFn: (id: string) => removeFavorite(id),
    onSuccess: (_data, id) => {
      removeLocal(id);
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('Removed from favorites');
    },
    onError: () => toast.error('Failed to remove favorite'),
  });
}
