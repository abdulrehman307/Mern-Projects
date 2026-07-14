import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Loader2,
  X,
  Star,
  Sparkles,
  Sun,
  CloudRain,
  CloudSnow,
  Zap,
  CloudFog,
  Shirt,
  Info,
  Wind
} from 'lucide-react';
import { useFavorites, useRemoveFavorite, useAddFavorite } from '../../hooks/useFavorites';
import { useFavoritesStore } from '../../store/favoritesStore';
import type { Location, CurrentWeather } from '../../types/weather.types';

interface Props {
  onSelectCity: (city: string) => void;
  variant?: 'chips' | 'sidebar';
  activeCityName?: string;
  activeLocation?: Location;
  currentWeather?: CurrentWeather;
}

export function WeatherInsights({ currentWeather }: { currentWeather?: CurrentWeather }) {
  if (!currentWeather) return null;

  const { temp_c, humidity, wind_kph, uv, vis_km, condition, pressure_mb } = currentWeather;
  const insights = [];

  // 1. Weather / Activity Recommendation
  if (uv >= 6) {
    insights.push({
      icon: <Sun className="w-4.5 h-4.5 text-amber-500" />,
      title: 'High UV Index',
      text: 'Protect your skin. Wear sunscreen (SPF 30+), sunglasses, and a hat if outdoors.',
    });
  } else if (
    condition.text.toLowerCase().includes('rain') ||
    condition.text.toLowerCase().includes('drizzle') ||
    condition.text.toLowerCase().includes('shower')
  ) {
    insights.push({
      icon: <CloudRain className="w-4.5 h-4.5 text-sky-500" />,
      title: 'Indoor Plans',
      text: 'Wet conditions outdoors. Ideal day for indoor reading, movie time, or museum trips.',
    });
  } else if (
    condition.text.toLowerCase().includes('snow') ||
    condition.text.toLowerCase().includes('blizzard') ||
    condition.text.toLowerCase().includes('sleet')
  ) {
    insights.push({
      icon: <CloudSnow className="w-4.5 h-4.5 text-indigo-400" />,
      title: 'Winter Warning',
      text: 'Expect snowy roads and slippery paths. Dress in thick layers and commute carefully.',
    });
  } else if (condition.text.toLowerCase().includes('thunder') || condition.text.toLowerCase().includes('storm')) {
    insights.push({
      icon: <Zap className="w-4.5 h-4.5 text-violet-500" />,
      title: 'Severe Weather',
      text: 'Thunderstorms active. Unplug delicate electronics and remain safely indoors.',
    });
  } else {
    if (temp_c >= 18 && temp_c <= 26 && wind_kph < 22) {
      insights.push({
        icon: <Sparkles className="w-4.5 h-4.5 text-emerald-500" />,
        title: 'Optimal Outdoors',
        text: 'Weather is wonderful! Perfect conditions for running, cycling, or a walk in the park.',
      });
    } else {
      insights.push({
        icon: <Sparkles className="w-4.5 h-4.5 text-accent" />,
        title: 'Stable Weather',
        text: `Currently experiencing ${condition.text.toLowerCase()} skies with moderate weather factors.`,
      });
    }
  }

  // 2. Clothing Advice
  if (temp_c < 5) {
    insights.push({
      icon: <Shirt className="w-4.5 h-4.5 text-blue-500" />,
      title: 'Freezing Weather',
      text: 'Wrap up completely! Heavy coat, scarf, insulated boots, and gloves are highly recommended.',
    });
  } else if (temp_c >= 5 && temp_c < 14) {
    insights.push({
      icon: <Shirt className="w-4.5 h-4.5 text-sky-500" />,
      title: 'Chilly Layers',
      text: 'A sweater, thick hoodie, or jacket is needed to stay warm and comfortable.',
    });
  } else if (temp_c >= 14 && temp_c < 22) {
    insights.push({
      icon: <Shirt className="w-4.5 h-4.5 text-amber-500" />,
      title: 'Light Cardigan',
      text: 'Mild breeze today. A light jacket, fleece, or long-sleeve knitwear is appropriate.',
    });
  } else {
    insights.push({
      icon: <Shirt className="w-4.5 h-4.5 text-orange-500" />,
      title: 'Breathable Fit',
      text: 'Warm climate. Wear loose-fitting, light-colored cotton clothing to stay fresh.',
    });
  }

  // 3. Environmental and Comfort Metrics
  if (humidity > 80 && temp_c > 26) {
    insights.push({
      icon: <Info className="w-4.5 h-4.5 text-rose-400" />,
      title: 'Sticky Humidity',
      text: 'Moist atmospheric moisture levels. Feels slightly muggier and warmer than actual readings.',
    });
  } else if (wind_kph > 25) {
    insights.push({
      icon: <Wind className="w-4.5 h-4.5 text-teal-500" />,
      title: 'Strong Winds',
      text: 'Wind speeds are elevated. Keep away from tall branches and hold items securely.',
    });
  } else if (vis_km < 4) {
    insights.push({
      icon: <CloudFog className="w-4.5 h-4.5 text-slate-400" />,
      title: 'Mist/Fog Advisory',
      text: 'Restricted outdoor sight lines. If traveling, switch on low beams and reduce velocity.',
    });
  } else {
    insights.push({
      icon: <Info className="w-4.5 h-4.5 text-indigo-500" />,
      title: 'Comfort Rating',
      text: `Good general atmospheric conditions with stable pressure (${pressure_mb} hPa).`,
    });
  }

  return (
    <div className="space-y-3.5 border-t border-border/60 pt-4.5">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-accent animate-pulse" />
        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
          💡 Smart Insights
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {insights.map((ins, i) => (
          <div key={i} className="flex gap-3 bg-bg-elevated/45 border border-border/30 p-3 rounded-2xl transition-all hover:bg-bg-elevated/60">
            <div className="mt-0.5 shrink-0">
              {ins.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-text-primary leading-tight">{ins.title}</p>
              <p className="text-[10.5px] text-text-secondary leading-normal mt-0.5">{ins.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FavoriteCities({
  onSelectCity,
  variant = 'chips',
  activeCityName,
  activeLocation,
  currentWeather,
}: Props) {
  const favorites = useFavoritesStore((s) => s.favorites);
  const { isLoading } = useFavorites();
  const { mutate: remove, isPending } = useRemoveFavorite();
  const { mutate: add, isPending: adding } = useAddFavorite();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-xs text-text-secondary py-2">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
        Loading favorites…
      </div>
    );
  }

  // Handle empty favorites state
  if (favorites.length === 0) {
    if (variant === 'chips') return null;

    return (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
            ⭐ Pinned Cities
          </p>
          <div className="flex flex-col items-center text-center p-5 rounded-2.5xl bg-bg-elevated/20 border border-dashed border-border/80">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-3.5">
              <Star className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-text-primary">No Pinned Cities</p>
            <p className="text-[10.5px] text-text-secondary leading-normal mt-1 max-w-[180px]">
              Pin your key locations to track their weather at a glance.
            </p>
            {activeLocation && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  add({
                    name: activeLocation.name,
                    country: activeLocation.country,
                    region: activeLocation.region,
                    lat: activeLocation.lat,
                    lon: activeLocation.lon,
                  })
                }
                disabled={adding}
                className="mt-4 flex items-center justify-center gap-1.5 w-full py-2 px-3 text-xs font-semibold rounded-xl bg-accent text-accent-foreground hover:opacity-90 shadow-md shadow-accent/10 cursor-pointer disabled:opacity-50 transition-all"
              >
                {adding ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>Pin {activeLocation.name}</>
                )}
              </motion.button>
            )}
          </div>
        </div>

        {currentWeather && <WeatherInsights currentWeather={currentWeather} />}
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
            ⭐ Pinned Cities
          </p>
          <nav className="flex flex-col gap-2" aria-label="Pinned cities">
            <AnimatePresence mode="popLayout">
              {favorites.map((fav) => {
                const isActive = activeCityName?.toLowerCase() === fav.name.toLowerCase();
                return (
                  <motion.div
                    key={fav._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border transition-all
                      ${isActive
                        ? 'bg-accent/10 border-accent/40 text-text-primary shadow-sm shadow-accent/5'
                        : 'bg-bg-surface border-border hover:border-text-secondary/35 text-text-primary hover:bg-bg-elevated'
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectCity(`${fav.name}, ${fav.country}`)}
                      className="flex-1 flex items-center gap-2.5 text-left text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <MapPin className={`w-4 h-4 shrink-0 ${isActive ? 'text-accent' : 'text-text-secondary'}`} />
                      <div className="truncate min-w-0">
                        <span className="block truncate leading-tight">{fav.name}</span>
                        <span className="text-[10px] text-text-secondary truncate mt-0.5 block leading-none">{fav.country}</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(fav._id);
                      }}
                      disabled={isPending}
                      aria-label={`Remove ${fav.name} from favorites`}
                      className="p-1 rounded hover:bg-bg-elevated text-text-secondary hover:text-rose-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity cursor-pointer disabled:opacity-50"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </nav>
        </div>

        {currentWeather && <WeatherInsights currentWeather={currentWeather} />}
      </div>
    );
  }

  // default 'chips' layout
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
        ⭐ Favorites
      </p>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {favorites.map((fav) => {
            const isActive = activeCityName?.toLowerCase() === fav.name.toLowerCase();
            return (
              <motion.div
                key={fav._id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all
                  ${isActive
                    ? 'bg-accent/15 border-accent text-accent-foreground shadow-sm shadow-accent/5'
                    : 'bg-bg-surface border-border text-text-primary hover:border-text-secondary/40'
                  }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectCity(`${fav.name}, ${fav.country}`)}
                  className="flex items-center gap-1.5 font-semibold cursor-pointer"
                >
                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-accent' : 'text-text-secondary'}`} />
                  {fav.name}
                </button>

                <button
                  type="button"
                  onClick={() => remove(fav._id)}
                  disabled={isPending}
                  aria-label={`Remove ${fav.name} from favorites`}
                  className="text-text-secondary hover:text-rose-500 transition-colors p-0.5 rounded cursor-pointer disabled:opacity-50"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
