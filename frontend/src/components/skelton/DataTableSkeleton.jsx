// components/skeletons/DataTableSkeleton.jsx

const DataTableSkeleton = ({
  columns = 6,
  rows = 5,
  className = "",
}) => {
  return (
    <div
      className={`bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden ${className}`}
    >
      <table className="w-full text-sm ">
        {/* Header */}
        <thead className="bg-zinc-100 dark:bg-zinc-700">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="p-3">
                <div className="h-3 w-24 rounded shimmer shimmer-delay-8 bg-zinc-300 dark:bg-zinc-600" />
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-t">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="p-3">
                  <div
                    className={`h-3 w-full rounded shimmer bg-zinc-300 dark:bg-zinc-700 shimmer-delay-${
                      (rowIdx % 4) + 8
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableSkeleton;
