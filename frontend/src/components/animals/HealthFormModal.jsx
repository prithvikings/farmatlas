import { useState } from "react";
import api from "../../lib/axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const HealthFormModal = ({ open, setOpen, animalId, onSuccess }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    type: "Routine Checkup",
    notes: "",
    medication: "",
    dosage: "",
    nextDueDate: "",
  });

  if (!open) return null;

  const handleSubmit = async () => {
    await api.post("/health", {
      ...form,
      animalId,
    });

    setOpen(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-[420px]">
        <h2 className="text-lg font-medium mb-4">Add Health Record</h2>

        <div className="space-y-3">
          <Input
  type="date"
  value={form.date}
  onChange={(e) => setForm({ ...form, date: e.target.value })}
/>


          <select
            className="w-full border rounded h-10 px-3 text-sm"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>Routine Checkup</option>
            <option>Vaccination</option>
            <option>Surgery</option>
            <option>Illness Treatment</option>
            <option>Other</option>
          </select>

          <Input
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          <Input
            placeholder="Medication (optional)"
            value={form.medication}
            onChange={(e) => setForm({ ...form, medication: e.target.value })}
          />

          <Input
            placeholder="Dosage (optional)"
            value={form.dosage}
            onChange={(e) => setForm({ ...form, dosage: e.target.value })}
          />

          <Input
            type="date"
            placeholder="Next Due Date"
            value={form.nextDueDate}
            onChange={(e) =>
              setForm({ ...form, nextDueDate: e.target.value })
            }
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

export default HealthFormModal;
