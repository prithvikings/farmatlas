import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const DEFAULT_FORM = {
  date: new Date().toISOString().slice(0, 10),
  type: "ROUTINE_CHECKUP",
  notes: "",
  medication: "",
  dosage: "",
  nextDueDate: "",
};

const HealthFormModal = ({ open, setOpen, animalId, record, onSuccess }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [error, setError] = useState(null);

  const isEdit = Boolean(record);

  useEffect(() => {
    if (record) {
      setForm({
        date: record.date?.slice(0, 10),
        type: record.type,
        notes: record.notes || "",
        medication: record.medication || "",
        dosage: record.dosage || "",
        nextDueDate: record.nextDueDate ? record.nextDueDate.slice(0, 10) : "",
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
      <div className="bg-white dark:bg-zinc-800 p-4 sm:p-6 rounded-lg w-full max-w-[420px] mx-4">
        <h2 className="text-lg font-poppins mb-4">
          {isEdit ? "Edit Health Record" : "Add Health Record"}
        </h2>

        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

        <div className="space-y-3">
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <select
            className="w-full border rounded px-3 py-2 bg-zinc-100 dark:bg-zinc-800 outline-none"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="ROUTINE_CHECKUP">Routine Checkup</option>
            <option value="VACCINATION">Vaccination</option>
            <option value="ILLNESS">Illness</option>
            <option value="INJURY">Injury</option>
            <option value="OTHER">Other</option>
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
            onChange={(e) => setForm({ ...form, nextDueDate: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            className="cursor-pointer bg-gradient-to-b from-[#666360] via-[#161311] to-[#110c0a] font-poppins text-slate-100 dark:from-[#141211] dark:via-[#0d0a08] dark:to-[#110c0a] transition duration-300 hover:text-zinc-300 dark:hover:text-zinc-50"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            className="cursor-pointer bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] font-poppins text-slate-100 shadow-lg hover:shadow-xl dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C] transition duration-300"
            onClick={handleSubmit}
          >
            {isEdit ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthFormModal;
