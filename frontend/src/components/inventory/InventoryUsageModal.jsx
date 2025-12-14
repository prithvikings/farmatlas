import { useState } from "react";
import api from "../../lib/axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const InventoryUsageModal = ({ open, setOpen, itemId, onSuccess }) => {
  const [quantityUsed, setQuantityUsed] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      await api.post("/inventory/usage", {
        itemId,
        quantityUsed: Number(quantityUsed),
        notes,
      });

      setOpen(false);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to log usage");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-96">
        <h2 className="text-lg font-medium mb-4">Log Usage</h2>

        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

        <div className="space-y-3">
          <Input
            type="number"
            placeholder="Quantity used"
            value={quantityUsed}
            onChange={(e) => setQuantityUsed(e.target.value)}
          />

          <Input
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryUsageModal;
