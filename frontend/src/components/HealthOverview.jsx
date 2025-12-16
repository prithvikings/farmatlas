import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import HealthFormModal from "./animals/HealthFormModal";
import { Pencil } from "lucide-react";
import DataTableSkeleton from "./skelton/DataTableSkeleton";
import { useOutletContext } from "react-router-dom";
import { Menu, X } from "lucide-react";
import HealthRecordCard from "./HealthRecordCard";

const HealthOverview = () => {
  const { sidebarOpen, toggleSidebar } = useOutletContext() || {};
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const canEdit = user.role === "ADMIN" || user.role === "VET";

  const fetchHealth = async () => {
    try {
      const res = await api.get("/health");
      setRecords(res.data);
    } catch (err) {
      console.error("Failed to load health records", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          {loading ? (
            <div className="h-8 w-56 rounded shimmer shimmer-delay-8 bg-zinc-300 dark:bg-zinc-700" />
          ) : (
            <h1 className="text-3xl font-medium font-poppins">
              Health Records
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
      </div>

      {loading ? (
        <DataTableSkeleton columns={canEdit ? 6 : 5} rows={6} />
      ) : records.length === 0 ? (
        <div className="text-sm text-zinc-500">No health records found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {records.map((r) => (
              <HealthRecordCard
                key={r._id}
                record={r}
                canEdit={canEdit}
                onEdit={(rec) => {
                  setEditingRecord(rec);
                  setOpen(true);
                }}
              />
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
                    Type
                  </th>
                  <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                    Date
                  </th>
                  <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                    Medication
                  </th>
                  <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                    Notes
                  </th>
                  {canEdit && (
                    <th className="p-3 text-right text-zinc-800 dark:text-zinc-300">
                      Action
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {records.map((r) => (
                  <tr
                    key={r._id}
                    className="border-t font-poppins font-medium odd:bg-zinc-50 dark:odd:bg-zinc-800 even:bg-zinc-200 dark:even:bg-zinc-900"
                  >
                    <td className="p-3 text-zinc-900 dark:text-zinc-200">
                      {r.animalId?.tagNumber} — {r.animalId?.name}
                    </td>
                    <td className="p-3 text-zinc-900 dark:text-zinc-200">
                      {r.type}
                    </td>
                    <td className="p-3 text-zinc-900 dark:text-zinc-200">
                      {new Date(r.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-zinc-900 dark:text-zinc-200">
                      {r.medication || "—"}
                    </td>
                    <td className="p-3 text-zinc-900 dark:text-zinc-200 max-w-xs truncate">
                      {r.notes}
                    </td>

                    {canEdit && (
                      <td className="p-3 text-right">
                        <Button
                          className="cursor-pointer bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] font-poppins text-slate-100 dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C] transition duration-300 hover:text-zinc-200 dark:hover:text-zinc-50"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingRecord(r);
                            setOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 size-4" /> Edit
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* MODAL */}
      {canEdit && (
        <HealthFormModal
          open={open}
          setOpen={setOpen}
          record={editingRecord}
          onSuccess={fetchHealth}
        />
      )}
    </>
  );
};

export default HealthOverview;
