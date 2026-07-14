import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useAddFavorite, useRemoveFavorite } from '../../hooks/useFavorites';
import { useFavoritesStore } from '../../store/favoritesStore';
import type { Location } from '../../types/weather.types';

interface Props {
  location: Location;
}

export function FavoriteButton({ location }: Props) {
  const isFav = useFavoritesStore((s) => s.isFavorite(location.name, location.country));
  const favorites = useFavoritesStore((s) => s.favorites);
  const { mutate: add, isPending: adding } = useAddFavorite();
  const { mutate: remove, isPending: removing } = useRemoveFavorite();

  const isPending = adding || removing;

  function handleToggle() {
    if (isPending) return;
    if (isFav) {
      const fav = favorites.find(
        (f) => f.name.toLowerCase() === location.name.toLowerCase() && f.country === location.country
      );
      if (fav) remove(fav._id);
    } else {
      add({
        name: location.name,
        country: location.country,
        region: location.region,
        lat: location.lat,
        lon: location.lon,
      });
    }
  }

  return (
    <motion.button
      id="favorite-toggle"
      type="button"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      disabled={isPending}
      aria-label={isFav ? `Remove ${location.name} from favorites` : `Add ${location.name} to favorites`}
      aria-pressed={isFav}
      className={`p-2.5 rounded-xl border transition-all duration-200 disabled:cursor-not-allowed cursor-pointer
        ${isFav
          ? 'bg-amber-500/10 border-amber-500/40 text-amber-500 dark:text-amber-400 shadow-md shadow-amber-500/10 dark:shadow-none'
          : 'bg-bg-elevated border-border text-text-secondary hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-500/30 shadow-sm dark:shadow-none'
        }`}
    >
      <Star
        className="w-5 h-5 transition-transform"
        fill={isFav ? 'currentColor' : 'none'}
      />
    </motion.button>
  );
}
