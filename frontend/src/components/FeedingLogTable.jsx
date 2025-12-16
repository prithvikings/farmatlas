const FeedingLogTable = ({ logs }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-700 font-lato">
          <tr>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Date
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Food
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Quantity
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr
              key={log._id}
              className="border-t font-poppins font-medium
                odd:bg-zinc-50 dark:odd:bg-zinc-800
                even:bg-white dark:even:bg-zinc-900"
            >
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {new Date(log.dateTime).toLocaleString()}
              </td>
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {log.foodType}
              </td>
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {log.quantity} {log.unit}
              </td>
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {log.notes || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedingLogTable;
