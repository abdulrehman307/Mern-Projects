import { motion } from 'framer-motion';
import { CloudSun, MapPin } from 'lucide-react';

interface Props {
  onGeoRequest?: () => void;
  geoStatus?: string;
}

export function EmptyState({ onGeoRequest, geoStatus }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6 py-20 text-center"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="p-5 rounded-2xl bg-accent/10 border border-accent/20 shadow-sm"
      >
        <CloudSun className="w-12 h-12 text-accent" />
      </motion.div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold text-text-primary">
          Welcome to Nimbus
        </h1>
        <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
          Search for any city worldwide to see rich, real-time weather stats and beautiful forecasts.
        </p>
      </div>

      {geoStatus === 'loading' && (
        <p className="text-sm text-accent font-semibold animate-pulse">
          📍 Detecting your location…
        </p>
      )}

      {(geoStatus === 'denied' || geoStatus === 'unavailable') && onGeoRequest && (
        <button
          id="request-location"
          onClick={onGeoRequest}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
            bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-[1.03]
            shadow-md shadow-accent/20 cursor-pointer"
        >
          <MapPin className="w-4 h-4" />
          Use my location
        </button>
      )}
    </motion.div>
  );
}
