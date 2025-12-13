import { useState } from "react";
import api from "../../lib/axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const InventoryFormModal = ({ open, setOpen, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    category: "FEED",
    quantity: 0,
    unit: "",
    lowStockThreshold: 0,
  });

  const [error, setError] = useState(null);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      await api.post("/inventory/item", {
        ...form,
        quantity: Number(form.quantity),
        lowStockThreshold: Number(form.lowStockThreshold),
      });

      setOpen(false);
      onSuccess();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create item"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-96">
        <h2 className="text-lg font-medium mb-4">Add Inventory Item</h2>

        {error && (
          <div className="text-sm text-red-600 mb-3">{error}</div>
        )}

        <div className="space-y-3">
          <Input
            placeholder="Item name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <select
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="FEED">Feed</option>
            <option value="MEDICINE">Medicine</option>
            <option value="OTHER">Other</option>
          </select>

          <Input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <Input
            placeholder="Unit (kg, litre, pcs)"
            value={form.unit}
            onChange={(e) =>
              setForm({ ...form, unit: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Low stock threshold"
            value={form.lowStockThreshold}
            onChange={(e) =>
              setForm({
                ...form,
                lowStockThreshold: e.target.value,
              })
            }
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryFormModal;
