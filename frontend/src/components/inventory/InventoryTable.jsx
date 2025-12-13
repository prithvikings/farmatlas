import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";


const InventoryTable = ({ items }) => {
  if (!items.length) {
    return <div className="text-sm text-zinc-500">No inventory items found.</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-700">
  <tr>
    <th className="p-3 text-left">Item</th>
    <th className="p-3 text-left">Category</th>
    <th className="p-3 text-left">Quantity</th>
    <th className="p-3 text-left">Unit</th>
    <th className="p-3 text-left">Status</th>
    <th className="p-3 text-right">Actions</th> {/* 👈 ADD THIS */}
  </tr>
</thead>

        <tbody>
          {items.map((item) => {
            const isLow =
              item.quantity <= item.lowStockThreshold;

            return (
              <tr key={item._id} className="border-t">
  <td className="p-3 font-medium">{item.name}</td>
  <td className="p-3">{item.category}</td>
  <td className="p-3">{item.quantity}</td>
  <td className="p-3">{item.unit}</td>

  <td className="p-3">
    {isLow ? (
      <span className="text-red-600 text-xs font-medium">
        Low stock
      </span>
    ) : (
      <span className="text-green-600 text-xs font-medium">
        OK
      </span>
    )}
  </td>

  <td className="p-3 text-right">
  <Link
    to={`/admin/inventory/${item._id}/usage`}
    className="inline-flex items-center p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-indigo-600 hover:text-indigo-800"
    title="Usage Logs"
  >
    <ClipboardList size={16} />
  </Link>
</td>

</tr>

            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
