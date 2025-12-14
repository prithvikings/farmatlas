import AdminSidebar from "./AdminSidebar";
import WorkerSidebar from "./WorkerSidebar";
import { useAuth } from "../context/AuthContext";
import { FiSettings } from "react-icons/fi";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-[1200px] mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-inter">FarmAtlas</div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">{user.role}</span>
            <FiSettings className="cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          {user.role === "ADMIN" ? (
            <AdminSidebar />
          ) : (
            <WorkerSidebar />
          )}

          {/* Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
