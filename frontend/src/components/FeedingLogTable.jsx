import { Pencil, Trash } from "lucide-react";

const FeedingLogTable = ({ logs }) => {
  if (!logs.length) {
    return <div className="text-sm text-zinc-500">No feeding logs.</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-700">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Food</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-t">
              <td className="p-3">
                {new Date(log.dateTime).toLocaleString()}
              </td>
              <td className="p-3">{log.foodType}</td>
              <td className="p-3">
                {log.quantity} {log.unit}
              </td>
              <td className="p-3">{log.notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedingLogTable;
