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
     <aside className="w-64 bg-white dark:bg-zinc-800 rounded-lg p-6 border">
            <nav className="space-y-6">
              <Link to="/admin" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2">
                <Grid size={18} /> Dashboard
              </Link>

              <Link to="/admin/animals" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2">
                <Activity size={18} /> Animals
              </Link>

              <Link to="/admin/users" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2">
                <User2 size={18} /> Users
              </Link>

              <Link to="/admin/health" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2">
                <Clipboard size={18} /> Health
              </Link>

              <Link to="/admin/feeding" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2">
                <Box size={18} /> Feeding
              </Link>

              <Link to="/admin/inventory" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2">
                <Database size={18} /> Inventory
              </Link>

              <Link to="/admin/financials" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2">
                <DollarSign size={18} /> Financials Overview
              </Link>

              <Link to="/admin/financials/transactions" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2">
                <DollarSign size={18} /> Transactions
              </Link>
            </nav>

            <div className="mt-6 pt-4 border-t">
              <button
                onClick={handleLogout}
                className="flex gap-2 text-sm text-red-600 hover:text-red-700 cursor-pointer"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </aside>

  )
}

export default AdminSidebar