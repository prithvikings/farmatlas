import { Link, useNavigate } from "react-router-dom";
import { Grid, Clipboard, Box, Database, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/axios";


const WorkerSidebar = () => {
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
            <nav className="space-y-4">
              <Link to="/worker" className="flex items-center gap-3 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700">
                <Grid size={18} /> Dashboard
              </Link>

              <Link to="/worker/health" className="flex items-center gap-3 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700">
                <Clipboard size={18} /> Health
              </Link>

              <Link to="/worker/feeding" className="flex items-center gap-3 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700">
                <Box size={18} /> Feeding
              </Link>

              <Link to="/worker/inventory" className="flex items-center gap-3 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700">
                <Database size={18} /> Inventory
              </Link>
            </nav>

            <div className="mt-6 pt-4 border-t">
              <button onClick={handleLogout} className="flex gap-2 text-sm">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </aside>
  )
}

export default WorkerSidebar