import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Activity,
  Clipboard,
  DollarSign,
  Database,
  Box,
  LogOut,
  User2,
  Wallet,
} from "lucide-react";

const AdminSidebar = () => {
  // ✅ hooks at top level
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/signout");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      navigate("/signin", { replace: true });
    }
  };
  return (
    <aside className="w-68 bg-white dark:bg-zinc-800 selection:bg-[#EA580C] selection:text-zinc-100 rounded-lg border shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 lg:p-6">
      <nav className="space-y-6">
        <Link
          to="/admin"
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out"
        >
          <Grid size={18} /> Dashboard
        </Link>

        <Link
          to="/admin/animals"
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out"
        >
          <Activity size={18} /> Animals
        </Link>

        <Link
          to="/admin/users"
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out"
        >
          <User2 size={18} /> Users
        </Link>

        <Link
          to="/admin/health"
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out"
        >
          <Clipboard size={18} /> Health
        </Link>

        <Link
          to="/admin/feeding"
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out"
        >
          <Box size={18} /> Feeding
        </Link>

        <Link
          to="/admin/inventory"
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out"
        >
          <Database size={18} /> Inventory
        </Link>

        <Link
          to="/admin/financials"
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out"
        >
          <Wallet size={18} /> Financials Overview
        </Link>

        <Link
          to="/admin/financials/transactions"
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out"
        >
          <DollarSign size={18} /> Transactions
        </Link>
      </nav>

      <div className="mt-6 flex justify-start pt-4 border-t">
        <button
          onClick={handleLogout}
          className="text-md font-poppins font-medium text-zinc-500 hover:text-zinc-600 cursor-pointer flex items-center gap-2 p-2 rounded transition duration-300 ease-in-out"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
