import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import api from "../lib/axios";
import FeedingLogTable from "./FeedingLogTable";
import FeedingLogModal from "./FeedingLogModal";
import DataTableSkeleton from "./skelton/DataTableSkeleton";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { WorkerFeedingLogCard } from "./FeddingLogCard";

const FeedingLogs = () => {
  const { animalId } = useParams();
  const { sidebarOpen, toggleSidebar } = useOutletContext() || {};

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await api.get(`/feeding/animal/${animalId}`);
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to load feeding logs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [animalId]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Top row */}
        <div className="flex items-center justify-between">
          {loading ? (
            <div className="h-8 w-40 rounded shimmer bg-zinc-300 dark:bg-zinc-700" />
          ) : (
            <h1 className="text-4xl md:text-3xl font-medium font-poppins">
              Feeding Logs
            </h1>
          )}

          {/* Mobile hamburger */}
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
                <X size={22} className="transition-transform rotate-90" />
              ) : (
                <Menu size={22} />
              )}
            </button>
          )}
        </div>

        {/* Action row */}
        <div className="flex justify-end">
          <Button
            className="w-full sm:w-auto cursor-pointer
              bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34]
              font-poppins text-slate-100 shadow-lg hover:shadow-xl
              dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C]
              transition duration-300"
            onClick={() => setOpen(true)}
          >
            + Add Feeding
          </Button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      {loading ? (
        <DataTableSkeleton columns={4} rows={6} />
      ) : logs.length === 0 ? (
        <div className="text-sm text-zinc-500 font-poppins">
          No feeding logs found.
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {logs.map((log) => (
              <WorkerFeedingLogCard key={log._id} log={log} />
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block">
            <FeedingLogTable logs={logs} />
          </div>
        </>
      )}

      {/* ================= MODAL ================= */}
      <FeedingLogModal
        open={open}
        setOpen={setOpen}
        animalId={animalId}
        onSuccess={fetchLogs}
      />
    </>
  );
};

export default FeedingLogs;
