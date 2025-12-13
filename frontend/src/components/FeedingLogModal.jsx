import { useState, useEffect } from "react";
import api from "../lib/axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const FeedingLogModal = ({ open, setOpen, animalId, onSuccess }) => {
  const [feedItems, setFeedItems] = useState([]);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    inventoryItemId: "",
    foodType: "",
    quantity: "",
    unit: "",
    dateTime: "",
    notes: "",
  });

  useEffect(() => {
  if (!open) return;

  api.get("/inventory/item")
    .then((res) => {
      const feeds = res.data.filter(
        (item) =>
          item.category === "FEED" && item.quantity > 0
      );
      setFeedItems(feeds);
    })
    .catch(() => {
      setError("Failed to load feed inventory");
    });
}, [open]);


  if (!open) return null;

  const selectedFeed = feedItems.find(
    (i) => i._id === form.inventoryItemId
  );

  const handleSubmit = async () => {
    setError(null);

    if (!form.inventoryItemId) {
      setError("Please select a feed item");
      return;
    }

    if (!form.quantity || Number(form.quantity) <= 0) {
      setError("Quantity must be greater than zero");
      return;
    }

    if (Number(form.quantity) > selectedFeed.quantity) {
      setError("Quantity exceeds available stock");
      return;
    }

    try {
      await api.post("/feeding", {
        animalId,
        inventoryItemId: form.inventoryItemId,
        foodType: form.foodType,
        quantity: Number(form.quantity),
        unit: form.unit,
        dateTime: form.dateTime,
        notes: form.notes,
      });

      setOpen(false);
      onSuccess();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create feeding log"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-96">
        <h2 className="text-lg font-medium mb-4">
          Add Feeding Log
        </h2>

        {error && (
          <div className="text-sm text-red-600 mb-3">
            {error}
          </div>
        )}

        {/* No feed available warning */}
{feedItems.length === 0 && (
  <div className="text-sm text-red-600 mb-3">
    No feed available in inventory.
  </div>
)}

        <div className="space-y-3">
          {/* Feed Selector */}
          <select
            className="w-full border rounded p-2 text-sm"
            value={form.inventoryItemId}
            onChange={(e) => {
              const feed = feedItems.find(
                (i) => i._id === e.target.value
              );

              setForm({
                ...form,
                inventoryItemId: e.target.value,
                foodType: feed?.name || "",
                unit: feed?.unit || "",
              });
            }}
          >
            <option value="">Select Feed</option>
            {feedItems.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} ({item.quantity} {item.unit})
              </option>
            ))}
          </select>

          <Input
            type="datetime-local"
            value={form.dateTime}
            onChange={(e) =>
              setForm({ ...form, dateTime: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <Input
            placeholder="Unit"
            value={form.unit}
            disabled
          />

          <Input
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
  onClick={handleSubmit}
  disabled={feedItems.length === 0}
>
  Create
</Button>
        </div>
      </div>
    </div>
  );
};

export default FeedingLogModal;
