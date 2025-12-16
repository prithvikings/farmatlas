import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import WorkerSidebar from "./WorkerSidebar";
import VetSidebar from "./VetSidebar";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const renderSidebar = () => {
    if (user.role === "ADMIN") return <AdminSidebar />;
    if (user.role === "WORKER") return <WorkerSidebar />;
    if (user.role === "VET") return <VetSidebar />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6">
        {/* ===== Desktop Sidebar ===== */}
        <div className="hidden lg:block">{renderSidebar()}</div>

        {/* ===== Mobile Sidebar Overlay ===== */}
        {sidebarOpen && (
          <div
            className={`
    fixed inset-0 z-40 lg:hidden
    transition-opacity duration-300
    ${
      sidebarOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
  `}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Drawer */}
            <div
              className={`
      absolute left-0 top-0 h-full w-72
      bg-white dark:bg-zinc-800
      px-2 py-4 pb-8
      transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
            >
              {renderSidebar()}
            </div>
          </div>
        )}

        {/* ===== Main Content ===== */}
        <main className="flex-1 w-full">
          <Outlet
            context={{
              sidebarOpen,
              openSidebar: () => setSidebarOpen(true),
              closeSidebar: () => setSidebarOpen(false),
              toggleSidebar: () => setSidebarOpen((v) => !v),
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
