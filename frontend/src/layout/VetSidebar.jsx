import { Link, useNavigate } from "react-router-dom";
import { Clipboard, Box, LogOut, Grid } from "lucide-react";
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
    <aside className="w-68 bg-white dark:bg-zinc-800 selection:bg-[#EA580C] selection:text-zinc-100 rounded-lg p-6 border shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <nav className="space-y-6">
        <Link
          to="/vet"
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out"
        >
          <Grid size={18} /> Dashboard
        </Link>

        <Link
          to="/vet/animals"
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out"
        >
          <Box size={18} /> Animals
        </Link>

        <Link
          to="/vet/health"
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded px-4 py-2 transition duration-300 ease-in-out"
        >
          <Clipboard size={18} /> Health Records
        </Link>
      </nav>

      <div className="mt-6 flex justify-start pt-4 border-t">
        <button
          onClick={logout}
          className="text-md font-poppins font-medium text-zinc-500 hover:text-zinc-600 cursor-pointer flex items-center gap-2 p-2 rounded transition duration-300 ease-in-out"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default VetSidebar;
