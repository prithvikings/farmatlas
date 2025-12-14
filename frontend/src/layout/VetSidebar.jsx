import { Link, useNavigate } from "react-router-dom";
import { Clipboard, Box, LogOut } from "lucide-react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const VetSidebar = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/auth/signout");
    setUser(null);
    navigate("/signin", { replace: true });
  };

  return (
    <aside className="w-64 bg-white dark:bg-zinc-800 rounded-lg p-6 border">
      <nav className="space-y-4">
        <Link to="/vet" className="flex gap-3 p-2 hover:bg-zinc-900 rounded">
          <Box size={18} /> Dashboard
        </Link>

        <Link to="/vet/animals" className="flex gap-3 p-2 hover:bg-zinc-900 rounded">
          <Box size={18} /> Animals
        </Link>

        <Link to="/vet/health" className="flex gap-3 p-2 hover:bg-zinc-900 rounded">
          <Clipboard size={18} /> Health Records
        </Link>
      </nav>

      <div className="mt-6 pt-4 border-t">
        <button onClick={logout} className="flex gap-2 text-sm">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default VetSidebar;
