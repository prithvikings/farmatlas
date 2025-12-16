import { useEffect, useState } from "react";
import api from "../lib/axios";
import AdminLayout from "../layout/AdminLayout";
import { Button } from "./ui/button";
import FinancialTransactionModal from "./FinancialTransactionModal";
import FinancialTable from "./FinancialTable";
import FinancialTableSkeleton from "../components/ui/FinancialTableSkeleton";
import { useOutletContext } from "react-router-dom";
import { Menu, X } from "lucide-react";
import FinancialTransactionCard from "./FinancialTransactionCard";
const Financials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { sidebarOpen, toggleSidebar } = useOutletContext() || {};

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
    <>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium font-poppins">
            Financial Transactions
          </h1>

          {toggleSidebar && (
            <button
              onClick={toggleSidebar}
              className="
          lg:hidden p-2 rounded-md border
          bg-white dark:bg-zinc-800
          hover:bg-zinc-200 dark:hover:bg-zinc-700
          transition-transform duration-200
        "
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X size={22} className="rotate-90 transition-transform" />
              ) : (
                <Menu size={22} />
              )}
            </button>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            className="w-full sm:w-auto cursor-pointer
        bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34]
        font-poppins text-slate-100 shadow-lg hover:shadow-xl
        dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C]
        transition duration-300"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            + Add Transaction
          </Button>
        </div>
      </div>

      {loading ? (
        <FinancialTableSkeleton />
      ) : (
        <>
          {/* Mobile cards */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {items.map((tx) => (
              <FinancialTransactionCard
                key={tx._id}
                tx={tx}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block">
            <FinancialTable
              items={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}

      <FinancialTransactionModal
        open={open}
        setOpen={setOpen}
        transaction={editing}
        onSuccess={fetchTransactions}
      />
    </>
  );
};

export default Financials;
