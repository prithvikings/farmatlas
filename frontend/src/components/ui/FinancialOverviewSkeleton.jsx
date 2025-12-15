import { Shimmer } from "./Schimmer";
const FinancialOverviewSkeleton = () => {
  return (
    <>
      {/* HEADER */}
      <div className="mb-6 space-y-2">
        <Shimmer className="h-6 w-56" />
        <Shimmer className="h-4 w-72" />
        <Shimmer className="h-3 w-40" />
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-800 rounded-lg border p-4 space-y-3"
          >
            <Shimmer className="h-4 w-24" />
            <Shimmer className="h-7 w-32" />
          </div>
        ))}
      </div>

      {/* MONTHLY TABLE */}
      <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <Shimmer className="h-4 w-32" />
        </div>

        <table className="w-full text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-700">
            <tr>
              {[1, 2, 3, 4].map((i) => (
                <th key={i} className="p-3">
                  <Shimmer className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr
                key={i}
                className="border-t odd:bg-zinc-50 dark:odd:bg-zinc-800 even:bg-white dark:even:bg-zinc-900"
              >
                <td className="p-3">
                  <Shimmer className="h-4 w-20" />
                </td>
                <td className="p-3">
                  <Shimmer className="h-4 w-24" />
                </td>
                <td className="p-3">
                  <Shimmer className="h-4 w-24" />
                </td>
                <td className="p-3 text-right">
                  <Shimmer className="h-4 w-20 ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FinancialOverviewSkeleton;
