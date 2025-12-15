import { Shimmer } from "./Schimmer";

const FinancialTableSkeleton = ({ rows = 6 }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-700">
          <tr>
            {["Type", "Amount", "Category", "Date", "Actions"].map((_, i) => (
              <th key={i} className="p-3">
                <Shimmer className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr
              key={i}
              className="border-t odd:bg-zinc-50 dark:odd:bg-zinc-800 even:bg-white dark:even:bg-zinc-900"
            >
              <td className="p-3">
                <Shimmer className="h-4 w-20" />
              </td>
              <td className="p-3">
                <Shimmer className="h-4 w-16" />
              </td>
              <td className="p-3">
                <Shimmer className="h-4 w-24" />
              </td>
              <td className="p-3">
                <Shimmer className="h-4 w-24" />
              </td>
              <td className="p-3 flex justify-end gap-3">
                <Shimmer className="h-8 w-8 rounded-md" />
                <Shimmer className="h-8 w-8 rounded-md" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTableSkeleton;
