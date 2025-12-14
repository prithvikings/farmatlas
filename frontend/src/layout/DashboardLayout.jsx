import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import WorkerSidebar from "./WorkerSidebar";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-[1200px] mx-auto flex gap-6">
        {user.role === "ADMIN" ? <AdminSidebar /> : <WorkerSidebar />}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
