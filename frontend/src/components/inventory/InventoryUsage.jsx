import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../lib/axios";
import AdminLayout from "../../layout/AdminLayout";
import { Button } from "../ui/button";
import InventoryUsageModal from "./InventoryUsageModal";

const InventoryUsage = () => {
  const { itemId } = useParams();

  const [logs, setLogs] = useState([]);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [logsRes, itemRes] = await Promise.all([
        api.get(`/inventory/usage/${itemId}`),
        api.get(`/inventory/item/${itemId}`),
      ]);

      setLogs(logsRes.data);
      setItem(itemRes.data);
    } catch (err) {
      console.error("Failed to load inventory usage data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemId]);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Inventory Usage</h1>

          {item && (
            <div className="text-sm text-zinc-500 mt-1">
              {item.name} — {item.quantity} {item.unit} remaining
              {item.quantity <= item.lowStockThreshold && (
                <span className="ml-2 text-red-600 font-medium">
                  ⚠ Low stock
                </span>
              )}
            </div>
          )}

          {item && item.quantity === 0 && (
            <div className="text-xs text-red-600 mt-1">
              Inventory empty — usage logging disabled
            </div>
          )}
        </div>

        {/* Log Usage Button */}
        <Button
          onClick={() => setOpen(true)}
          disabled={!item || item.quantity === 0}
          title={
            item && item.quantity === 0
              ? "Cannot log usage. Inventory is empty."
              : "Log inventory usage"
          }
        >
          {item && item.quantity === 0 ? "Out of Stock" : "Log Usage"}
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-sm text-zinc-500">Loading usage logs…</div>
      ) : logs.length === 0 ? (
        <div className="text-sm text-zinc-500">
          No usage logs recorded for this item.
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log._id}
              className="bg-white dark:bg-zinc-800 border rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div className="font-medium">
                  Used {log.quantityUsed}
                </div>
                <div className="text-sm text-zinc-500">
                  {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="text-sm text-zinc-600 mt-1">
                By {log.usedBy?.name} ({log.usedBy?.role})
              </div>

              {log.notes && (
                <div className="text-sm mt-2">
                  📝 {log.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <InventoryUsageModal
        open={open}
        setOpen={setOpen}
        itemId={itemId}
        onSuccess={fetchData}
      />
    </AdminLayout>
  );
};

export default InventoryUsage;
