import { motion } from 'framer-motion';

function SkeletonBlock({ className }: { className: string }) {
  return (
    <div className={`rounded-xl bg-bg-elevated animate-pulse ${className}`} />
  );
}

/**
 * Layout-matched skeleton loader — structured as a complete copy of
 * the dashboard grid to prevent any layout shift during query transitions.
 */
export function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start w-full"
    >
      {/* Sidebar Favorites Skeleton (Desktop) */}
      <div className="hidden lg:block lg:col-span-1 bg-bg-surface border border-border p-4.5 rounded-3xl min-h-[350px] space-y-4">
        <SkeletonBlock className="h-4 w-24" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>

      {/* Main dashboard skeleton area */}
      <div className="lg:col-span-3 space-y-6">
        {/* Mobile chip list skeleton */}
        <div className="flex gap-2 lg:hidden overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-8 w-24 rounded-full shrink-0" />
          ))}
        </div>

        {/* Mid-level columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Main widgets area skeleton */}
          <div className="md:col-span-2 space-y-6">
            {/* Hero Panel Skeleton */}
            <div className="rounded-3xl p-6 bg-bg-surface border border-border space-y-6 shadow-sm">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <SkeletonBlock className="h-4 w-40" />
                  <SkeletonBlock className="h-3 w-24" />
                </div>
                <SkeletonBlock className="h-10 w-10" />
              </div>
              <div className="flex items-center gap-6">
                <SkeletonBlock className="h-16 w-32" />
                <SkeletonBlock className="ml-auto h-24 w-24 rounded-2xl" />
              </div>
              <div className="flex justify-between items-center border-t border-border/60 pt-4">
                <SkeletonBlock className="h-6 w-24" />
                <SkeletonBlock className="h-4 w-36" />
              </div>
            </div>

            {/* Hourly strip skeleton */}
            <div className="rounded-3xl p-5 bg-bg-surface border border-border space-y-3">
              <SkeletonBlock className="h-4 w-32" />
              <div className="flex gap-3 overflow-hidden">
                {Array.from({ length: 7 }).map((_, i) => (
                  <SkeletonBlock key={i} className="h-20 w-16 shrink-0" />
                ))}
              </div>
            </div>

            {/* Temp Trend chart skeleton */}
            <div className="rounded-3xl p-5 bg-bg-surface border border-border space-y-4">
              <SkeletonBlock className="h-4 w-48" />
              <SkeletonBlock className="h-44 w-full" />
            </div>
          </div>

          {/* Stats grid skeleton */}
          <div className="md:col-span-1 grid grid-cols-2 gap-3.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-bg-surface border border-border p-4 rounded-xl flex flex-col justify-between h-24">
                <div className="flex justify-between items-start gap-2">
                  <SkeletonBlock className="h-3.5 w-14" />
                  <SkeletonBlock className="h-6 w-6" />
                </div>
                <SkeletonBlock className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>

        {/* Daily Forecast Row Skeleton */}
        <div className="rounded-3xl p-5 bg-bg-surface border border-border space-y-4">
          <SkeletonBlock className="h-4 w-32" />
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="bg-bg-surface border border-border p-3.5 rounded-xl flex flex-col items-center gap-3">
                <SkeletonBlock className="h-4 w-12" />
                <SkeletonBlock className="h-10 w-10" />
                <SkeletonBlock className="h-3.5 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
