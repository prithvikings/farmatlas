import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import api from "../../lib/axios";
import { Button } from "../ui/button";
import HealthFormModal from "./HealthFormModal";
import { useAuth } from "../../context/AuthContext";
import { Pencil, Trash, Menu, X } from "lucide-react";

const AnimalHealth = () => {
  const { animalId } = useParams();
  const { user } = useAuth();
  const { sidebarOpen, toggleSidebar } = useOutletContext() || {};

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const canCreate = user.role === "ADMIN" || user.role === "VET";
  const canEdit = user.role === "ADMIN" || user.role === "VET";
  const canDelete = user.role === "ADMIN";

  const fetchRecords = async () => {
    try {
      const res = await api.get(`/health/animal/${animalId}`);
      setRecords(res.data);
    } catch (err) {
      console.error("Failed to load health records", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [animalId]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Top row */}
        <div className="flex items-center justify-between">
          {loading ? (
            <div className="h-8 w-56 rounded shimmer bg-zinc-300 dark:bg-zinc-700" />
          ) : (
            <h1 className="text-4xl md:text-3xl font-medium font-poppins">
              Health Records
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
                <Menu size={22} className="transition-transform rotate-0" />
              )}
            </button>
          )}
        </div>

        {/* Action row */}
        {canCreate && (
          <div className="flex justify-end">
            <Button
              className="w-full sm:w-auto cursor-pointer
          bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34]
          font-poppins text-slate-100 shadow-lg hover:shadow-xl
          dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C]
          transition duration-300"
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
            >
              + Add Health Record
            </Button>
          </div>
        )}
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-800 border rounded-lg p-4 shimmer"
            >
              <div className="h-4 w-40 rounded bg-zinc-300 dark:bg-zinc-700 mb-2" />
              <div className="h-3 w-32 rounded bg-zinc-300 dark:bg-zinc-700 mb-3" />
              <div className="h-3 w-full rounded bg-zinc-300 dark:bg-zinc-700" />
            </div>
          ))}
        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && records.length === 0 && (
        <div className="text-sm text-zinc-500 font-poppins">
          No health records found.
        </div>
      )}

      {/* ================= RECORDS ================= */}
      {!loading && records.length > 0 && (
        <div className="space-y-4">
          {records.map((r) => (
            <div
              key={r._id}
              className="bg-white dark:bg-zinc-800 border rounded-lg p-4 shadow-sm"
            >
              {/* Top row */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="font-poppins font-medium">{r.type}</div>
                  <div className="text-sm text-zinc-500 font-rubik">
                    {new Date(r.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {r.createdBy && (
                    <div className="hidden sm:block text-sm text-zinc-600 dark:text-zinc-300 font-poppins">
                      By {r.createdBy.name} ({r.createdBy.role})
                    </div>
                  )}

                  {canEdit && (
                    <button
                      onClick={() => {
                        setEditing(r);
                        setOpen(true);
                      }}
                      className="p-2 rounded hover:bg-zinc-100
                        dark:hover:bg-zinc-700 text-blue-600 dark:text-yellow-500"
                      title="Edit record"
                    >
                      <Pencil size={16} />
                    </button>
                  )}

                  {canDelete && (
                    <button
                      onClick={async () => {
                        if (!confirm("Delete this health record?")) return;
                        await api.delete(`/health/${r._id}`);
                        fetchRecords();
                      }}
                      className="p-2 rounded hover:bg-zinc-100
                        dark:hover:bg-zinc-700 text-red-600"
                      title="Delete record"
                    >
                      <Trash size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="mt-2 text-sm font-poppins">{r.notes}</div>

              {/* Medication */}
              {r.medication && (
                <div className="mt-2 text-sm text-zinc-600 font-poppins">
                  💊 {r.medication}
                  {r.dosage && ` — ${r.dosage}`}
                </div>
              )}

              {/* Next due */}
              {r.nextDueDate && (
                <div className="mt-2 text-sm text-red-600 font-poppins">
                  Next due: {new Date(r.nextDueDate).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {canCreate && (
        <HealthFormModal
          open={open}
          setOpen={setOpen}
          animalId={animalId}
          record={editing}
          onSuccess={() => {
            setEditing(null);
            fetchRecords();
          }}
        />
      )}
    </>
  );
};

export default AnimalHealth;
