import { Pencil, Trash } from "lucide-react";

const FeedingLogTable = ({ logs, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg">
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr className="text-left">
            <th className="p-3">Date</th>
            <th className="p-3">Food</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Logged By</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-b">
              <td className="p-3">
                {new Date(log.dateTime).toLocaleDateString()}
              </td>
              <td className="p-3">{log.foodType}</td>
              <td className="p-3">
                {log.quantity} {log.unit}
              </td>
              <td className="p-3">{log.loggedBy?.name}</td>
              <td className="p-3 flex justify-end gap-3">
                <button onClick={() => onEdit(log)}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(log._id)}>
                  <Trash size={16} className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedingLogTable;
