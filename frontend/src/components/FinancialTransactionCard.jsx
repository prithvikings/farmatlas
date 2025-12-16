import { Pencil, Trash } from "lucide-react";

const FinancialTransactionCard = ({ tx, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4 space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Type</span>
        <span className="font-medium">{tx.type}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Amount</span>
        <span className="font-medium">₹{tx.amount}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-zinc-500">Category</span>
        <span>{tx.category}</span>
      </div>

      <div className="text-sm text-zinc-500">
        {new Date(tx.date).toLocaleDateString()}
      </div>

      <div className="pt-3 flex justify-end gap-3">
        <button
          className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-blue-600"
          onClick={() => onEdit(tx)}
        >
          <Pencil size={16} />
        </button>
        <button
          className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-red-600"
          onClick={() => onDelete(tx._id)}
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default FinancialTransactionCard;
