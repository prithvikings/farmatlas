import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Button } from "./ui/button";
import FeedingLogModal from "./FeedingLogModal";
import { useAuth } from "../context/AuthContext";
import DataTableSkeleton from "../components/skelton/DataTableSkeleton";
import { useOutletContext } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FeedingLogCard } from "./FeddingLogCard";

const FeedingOverview = () => {
  const { user } = useAuth();
  const { sidebarOpen, toggleSidebar } = useOutletContext() || {};
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const canCreate = user.role === "ADMIN" || user.role === "WORKER";

  const fetchLogs = async () => {
    try {
      const res = await api.get("/feeding");
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to load feeding logs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          {loading ? (
            <div className="h-8 w-64 rounded shimmer shimmer-delay-1 bg-zinc-300 dark:bg-zinc-700" />
          ) : (
            <h1 className="text-3xl font-medium font-poppins">
              Feeding Activity
            </h1>
          )}

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

        {canCreate && !loading && (
          <div className="flex justify-end">
            <Button
              className="w-full sm:w-auto cursor-pointer
          bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34]
          font-poppins text-slate-100 shadow-lg hover:shadow-xl
          dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C]
          transition duration-300"
              onClick={() => setOpen(true)}
            >
              + Log Feeding
            </Button>
          </div>
        )}
      </div>

      {/* Content wrapper (IMPORTANT: relative) */}
      <div className="relative">
        {/* Skeleton overlay */}
        {loading && (
          <div className="absolute inset-0 z-10">
            <DataTableSkeleton columns={5} rows={6} />
          </div>
        )}

        {/* Real content (always mounted) */}
        <div
          className={`transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {logs.length === 0 ? (
            <div className="text-sm text-zinc-500">
              No feeding activity yet.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:hidden">
                {logs.map((log) => (
                  <FeedingLogCard key={log._id} log={log} />
                ))}
              </div>
              <div className="hidden sm:block bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-100 dark:bg-zinc-700 font-roboto">
                    <tr>
                      <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                        Animal
                      </th>
                      <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                        Food
                      </th>
                      <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                        Quantity
                      </th>
                      <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                        Fed By
                      </th>
                      <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {logs.map((log) => (
                      <tr
                        key={log._id}
                        className="border-t font-poppins font-medium
                        odd:bg-zinc-50 dark:odd:bg-zinc-800
                        even:bg-white dark:even:bg-zinc-900"
                      >
                        <td className="p-3 text-zinc-900 dark:text-zinc-200">
                          {log.animalId?.tagNumber} – {log.animalId?.name}
                        </td>
                        <td className="p-3 text-zinc-900 dark:text-zinc-200">
                          {log.foodType}
                        </td>
                        <td className="p-3 text-zinc-900 dark:text-zinc-200">
                          {log.quantity} {log.unit}
                        </td>
                        <td className="p-3 text-zinc-900 dark:text-zinc-200">
                          {log.loggedBy?.name} ({log.loggedBy?.role})
                        </td>
                        <td className="p-3 font-light text-zinc-900 dark:text-zinc-400">
                          {new Date(log.dateTime).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {canCreate && (
        <FeedingLogModal open={open} setOpen={setOpen} onSuccess={fetchLogs} />
      )}
    </>
  );
};

export default FeedingOverview;
