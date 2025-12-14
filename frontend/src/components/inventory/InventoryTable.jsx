import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

const InventoryTable = ({ items, canManage }) => {
  if (!items.length) {
    return (
      <div className="text-sm text-zinc-500">No inventory items found.</div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-700 font-lato">
          <tr>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Item
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Category
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Quantity
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Unit
            </th>
            <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
              Status
            </th>

            {canManage && (
              <th className="p-3 text-right text-zinc-800 dark:text-zinc-300">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => {
            const isLow = item.quantity <= item.lowStockThreshold;

            return (
              <tr
                key={item._id}
                className="border-t font-poppins font-medium odd:bg-zinc-50 dark:odd:bg-zinc-800 even:bg-zinc-00 dark:even:bg-zinc-900"
              >
                <td className="p-3 font-medium text-zinc-900 dark:text-zinc-200">
                  {item.name}
                </td>
                <td className="p-3 text-zinc-900 dark:text-zinc-200">
                  {item.category}
                </td>
                <td className="p-3 text-zinc-900 dark:text-zinc-200">
                  {item.quantity}
                </td>
                <td className="p-3 text-zinc-900 dark:text-zinc-200">
                  {item.unit}
                </td>

                <td className="p-3">
                  {isLow ? (
                    <span className="text-red-500 text-sm">Low stock</span>
                  ) : (
                    <span className="text-green-500 text-sm">OK</span>
                  )}
                </td>

                {canManage && (
                  <td className="p-3 text-right">
                    <Link
                      to={`/admin/inventory/${item._id}/usage`}
                      className="inline-flex items-center p-2 rounded hover:bg-zinc-100  text-blue-600 dark:hover:bg-zinc-700 dark:text-yellow-500 transition duration-100"
                      title="Usage Logs"
                    >
                      <ClipboardList size={16} />
                    </Link>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
