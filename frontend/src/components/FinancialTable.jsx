import { Pencil, Trash } from "lucide-react";

const FinancialTable = ({ items, onEdit, onDelete }) => {
  if (!items.length) {
    return <div className="text-sm text-zinc-500">No transactions found.</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-700">
          <tr>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((tx) => (
            <tr key={tx._id} className="border-t">
              <td className="p-3">{tx.type}</td>
              <td className="p-3">{tx.amount}</td>
              <td className="p-3">{tx.category}</td>
              <td className="p-3">
                {new Date(tx.date).toLocaleDateString()}
              </td>
              <td className="p-3 text-right flex justify-end gap-3">
                <button onClick={() => onEdit(tx)}>
                  <Pencil size={16} />
                </button>
                <button
                  className="text-red-600"
                  onClick={() => onDelete(tx._id)}
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTable;
