import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const DEFAULT_FORM = {
  date: new Date().toISOString().slice(0, 10),
  type: "Routine Checkup",
  notes: "",
  medication: "",
  dosage: "",
  nextDueDate: "",
};

const HealthFormModal = ({ open, setOpen, animalId, record, onSuccess }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [error, setError] = useState(null);

  const isEdit = Boolean(record);

  // ✅ hydrate form on edit
  useEffect(() => {
    if (record) {
      setForm({
        date: record.date?.slice(0, 10),
        type: record.type,
        notes: record.notes || "",
        medication: record.medication || "",
        dosage: record.dosage || "",
        nextDueDate: record.nextDueDate
          ? record.nextDueDate.slice(0, 10)
          : "",
      });
    } else {
      setForm(DEFAULT_FORM);
    }
  }, [record, open]);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setError(null);

      if (!form.date || !form.type || !form.notes) {
        setError("Date, type and notes are required.");
        return;
      }

      if (isEdit) {
        await api.put(`/health/${record._id}`, form);
      } else {
        await api.post("/health", {
          animalId,
          ...form,
        });
      }

      setOpen(false);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save record");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-[420px]">
        <h2 className="text-lg font-medium mb-4">
          {isEdit ? "Edit Health Record" : "Add Health Record"}
        </h2>

        {error && (
          <div className="text-sm text-red-600 mb-3">{error}</div>
        )}

        <div className="space-y-3">
          <Input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <select
            className="w-full border rounded h-10 px-3 text-sm"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
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
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
          />

          <Input
            placeholder="Medication (optional)"
            value={form.medication}
            onChange={(e) =>
              setForm({ ...form, medication: e.target.value })
            }
          />

          <Input
            placeholder="Dosage (optional)"
            value={form.dosage}
            onChange={(e) =>
              setForm({ ...form, dosage: e.target.value })
            }
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
          <Button onClick={handleSubmit}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthFormModal;
