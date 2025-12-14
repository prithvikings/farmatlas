import { Pencil, Trash } from "lucide-react";

const FinancialTable = ({ items, onEdit, onDelete }) => {
  if (!items.length) {
    return <div className="text-sm text-zinc-500">No transactions found.</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-700 font-lato">
          <tr>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Type
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Amount
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Category
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Date
            </th>
            <th className="p-3 text-right text-zinc-800 dark:text-zinc-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((tx) => (
            <tr
              key={tx._id}
              className="border-t font-poppins font-medium odd:bg-zinc-50 dark:odd:bg-zinc-800 even:bg-zinc-00 dark:even:bg-zinc-900"
            >
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {tx.type}
              </td>
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {tx.amount}
              </td>
              <td className="p-3 text-zinc-900 dark:text-zinc-200">
                {tx.category}
              </td>
              <td className="p-3 text-zinc-700 dark:text-zinc-400 font-light font-poppins">
                {new Date(tx.date).toLocaleDateString()}
              </td>
              <td className="p-3 text-right flex justify-end gap-3">
                <button
                  className="p-2 cursor-pointer transition duration-100 rounded hover:bg-zinc-100  text-blue-600 dark:hover:bg-zinc-700 dark:text-yellow-500"
                  onClick={() => onEdit(tx)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="p-2 cursor-pointer transition duration-100 rounded hover:bg-zinc-100 text-red-600 dark:hover:bg-zinc-700 dark:text-red-500"
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
