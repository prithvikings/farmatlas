import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const FeedingLogModal = ({ open, setOpen, log, animalId, onSuccess }) => {
  const [form, setForm] = useState({
    dateTime: "",
    foodType: "",
    quantity: "",
    unit: "kg",
    notes: "",
  });

  useEffect(() => {
    if (log) {
      setForm({
        dateTime: log.dateTime.slice(0, 16),
        foodType: log.foodType,
        quantity: log.quantity,
        unit: log.unit,
        notes: log.notes || "",
      });
    }
  }, [log]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (log) {
      await api.put(`/feeding/${log._id}`, form);
    } else {
      await api.post("/feeding", {
        ...form,
        animalId,
      });
    }
    setOpen(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-96">
        <h2 className="text-lg font-medium mb-4">
          {log ? "Edit Feeding Log" : "Add Feeding Log"}
        </h2>

        <div className="space-y-3">
          <Input
            type="datetime-local"
            value={form.dateTime}
            onChange={(e) =>
              setForm({ ...form, dateTime: e.target.value })
            }
          />
          <Input
            placeholder="Food Type"
            value={form.foodType}
            onChange={(e) =>
              setForm({ ...form, foodType: e.target.value })
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
            placeholder="Unit (kg/litre)"
            value={form.unit}
            onChange={(e) =>
              setForm({ ...form, unit: e.target.value })
            }
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
          <Button onClick={handleSubmit}>
            {log ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedingLogModal;
