import { Link } from "react-router-dom";
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
import { FiSettings } from "react-icons/fi";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-inter">FarmAtlas</div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Admin</span>
            <FiSettings className="cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 bg-white dark:bg-zinc-800 rounded-lg p-6 border">
            <nav className="space-y-6">
              <Link to="/admin" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out">
                <Grid size={18} /> Dashboard
              </Link>
              <Link to="/admin/animals" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out">
                <Activity size={18} /> Animals
              </Link>
              <Link to="/admin/users" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out">
               <User2 size={18}/> Users
              </Link>

              <Link to="/admin/health" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out">
                <Clipboard size={18} /> Health
              </Link>
              <Link to="/admin/feeding" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out">
                <Box size={18} /> Feeding
              </Link>
              <Link to="/admin/inventory" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out">
                <Database size={18} /> Inventory
              </Link>
              <Link to="/admin/financials" className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out">
                <DollarSign size={18} /> Financials
              </Link>
            </nav>

            <div className="mt-6 pt-4 border-t">
              <Link to="/logout" className="flex gap-2 text-sm">
                <LogOut size={16} /> Logout
              </Link>
            </div>
          </aside>

          {/* Page Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
