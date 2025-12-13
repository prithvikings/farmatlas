import { useEffect, useState } from "react";
import api from "../lib/axios";
import AdminLayout from "../layout/AdminLayout";
import { Button } from "./ui/button";
import FinancialTransactionModal from "./FinancialTransactionModal";
import FinancialTable from "./FinancialTable";

const Financials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/financial");
      setItems(res.data.items);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEdit = (tx) => {
    setEditing(tx);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    await api.delete(`/financial/${id}`);
    fetchTransactions();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Financial Transactions</h1>
        <Button onClick={() => { setEditing(null); setOpen(true); }}>
          + Add Transaction
        </Button>
      </div>

      {loading ? (
        <div className="text-sm text-zinc-500">Loading…</div>
      ) : (
        <FinancialTable
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <FinancialTransactionModal
        open={open}
        setOpen={setOpen}
        transaction={editing}
        onSuccess={fetchTransactions}
      />
    </AdminLayout>
  );
};

export default Financials;
