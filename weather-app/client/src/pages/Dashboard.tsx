import { motion, AnimatePresence } from 'framer-motion';
import { RecentSearches } from '../components/search/RecentSearches';
import { EmptyState } from '../components/feedback/EmptyState';
import { LoadingSkeleton } from '../components/feedback/LoadingSkeleton';
import { ErrorState } from '../components/feedback/ErrorState';
import { FavoriteCities } from '../components/favorites/FavoriteCities';
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard';
import { HourlyForecast } from '../components/weather/HourlyForecast';
import { TempTrendChart } from '../components/weather/TempTrendChart';
import { WeatherStatsGrid } from '../components/weather/WeatherStatsGrid';
import { DailyForecast } from '../components/weather/DailyForecast';
import { SEO } from '../components/seo/SEO';
import type { WeatherData } from '../types/weather.types';

interface DashboardProps {
  geo: { status: string; retry: () => void };
  activeQuery: string;
  setActiveQuery: React.Dispatch<React.SetStateAction<string>>;
  data: WeatherData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  handleSearch: (city: string) => void;
  todayHours: any[];
}

export function Dashboard({
  geo,
  activeQuery,
  setActiveQuery,
  data,
  isLoading,
  isError,
  error,
  isFetching,
  handleSearch,
  todayHours,
}: DashboardProps) {
  // Determine city name for SEO
  const _locationName = data ? `${data.location.name}, ${data.location.country}` : 'Dashboard';

  return (
    <>
      <SEO
        title={data ? `Weather in ${data.location.name}` : 'Live Dashboard'}
        description={data ? `Current weather and forecast for ${data.location.name}.` : 'Real-time weather tracking.'}
        canonicalPath="/"
        geoPlacename={data?.location.name}
      />
      <div className="space-y-6">
        {/* Recent Searches chips at the top */}
        <RecentSearches onSelect={handleSearch} />

        {/* Stale/fetching badge */}
        <AnimatePresence>
          {isFetching && data && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-center text-xs text-accent flex items-center justify-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Refreshing weather data…
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content area */}
        {!activeQuery ? (
          <EmptyState
            onGeoRequest={geo.retry}
            geoStatus={geo.status}
          />
        ) : isLoading && !data ? (
          <LoadingSkeleton />
        ) : isError && !data ? (
          <ErrorState
            error={error as Error}
            query={activeQuery}
            onRetry={() => setActiveQuery((q) => q + ' ')}
          />
        ) : data ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Desktop Favorites Sidebar */}
            <aside className="hidden lg:block lg:col-span-1 bg-bg-surface border border-border p-5 rounded-3xl shadow-sm dark:shadow-none">
              <FavoriteCities
                onSelectCity={handleSearch}
                variant="sidebar"
                activeCityName={data.location.name}
                activeLocation={data.location}
                currentWeather={data.current}
              />
            </aside>

            {/* Dashboard main columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Mobile/Tablet Favorites Chips */}
              <div className="block lg:hidden">
                <FavoriteCities
                  onSelectCity={handleSearch}
                  variant="chips"
                  activeCityName={data.location.name}
                />
              </div>

              {/* Grid content split: 2/3 widgets, 1/3 stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-2 space-y-6">
                  <CurrentWeatherCard data={data} />
                  <HourlyForecast hours={todayHours} localtime={data.location.localtime} />
                  <TempTrendChart hours={todayHours} localtime={data.location.localtime} />
                </div>

                <div className="md:col-span-1">
                  <WeatherStatsGrid current={data.current} />
                </div>
              </div>

              {/* Bottom horizontal daily forecast row */}
              <DailyForecast forecastDays={data.forecast.forecastday} />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
