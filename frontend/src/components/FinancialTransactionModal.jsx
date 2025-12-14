import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";

const FinancialTransactionModal = ({
  open,
  setOpen,
  transaction,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    type: "EXPENSE",
    amount: "",
    category: "OTHER",
    description: "",
    date: new Date().toISOString().slice(0, 10), // ✅ default today
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (transaction) {
      setForm({
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description || "",
        date: transaction.date?.slice(0, 10),
      });
    }
  }, [transaction]);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      const payload = {
        type: form.type,
        amount: Number(form.amount),
        category: form.category,
        description: form.description,
        ...(form.date && { date: form.date }),
      };

      if (transaction) {
        await api.put(`/financial/${transaction._id}`, payload);
      } else {
        await api.post("/financial", payload);
      }

      setOpen(false);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-96">
        <h2 className="text-lg font-poppins mb-4">
          {transaction ? "Edit Transaction" : "Add Transaction"}
        </h2>

        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

        <div className="space-y-3">
          <select
            className="w-full border rounded px-3 py-2 bg-zinc-100 dark:bg-zinc-800 outline-none "
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option
              className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-600 dark:hover:bg-zinc-700"
              value="INCOME"
            >
              Income
            </option>
            <option
              className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-600 dark:hover:bg-zinc-700"
              value="EXPENSE"
            >
              Expense
            </option>
          </select>

          <Input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <select
            className="w-full border rounded px-3 py-2 bg-zinc-100 dark:bg-zinc-800 outline-none"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="FEED">Feed</option>
            <option value="MEDICINE">Medicine</option>
            <option value="EQUIPMENT">Equipment</option>
            <option value="SALES">Sales</option>
            <option value="OTHER">Other</option>
          </select>

          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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
            className="cursor-pointer bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] font-poppins text-slate-100 shadow-lg hover:shadow-xl dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C] transition duration-300 "
            onClick={handleSubmit}
          >
            {transaction ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinancialTransactionModal;
