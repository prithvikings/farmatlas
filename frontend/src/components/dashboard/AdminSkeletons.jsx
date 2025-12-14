import { Shimmer } from "../ui/Schimmer";

export const StatCardSkeleton = () => (
  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
    <Shimmer className="h-4 w-24 mb-3" />
    <Shimmer className="h-8 w-16" />
  </div>
);

export const LargeCardSkeleton = () => (
  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
    <Shimmer className="h-5 w-40 mb-4" />

    <div className="space-y-3">
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-5/6" />
      <Shimmer className="h-4 w-4/6" />
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
    <Shimmer className="h-5 w-56 mb-4" />
    <Shimmer className="h-48 w-full" />
  </div>
);
