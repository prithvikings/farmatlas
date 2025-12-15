import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../lib/axios";
import AdminLayout from "../../layout/AdminLayout";
import { Button } from "../ui/button";
import HealthFormModal from "./HealthFormModal";
import { useAuth } from "../../context/AuthContext";
import { Pencil, Trash } from "lucide-react";

const AnimalHealth = () => {
  const { animalId } = useParams();
  const { user } = useAuth();

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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-poppins">Health Records</h1>

        {canCreate && (
          <Button
          className="cursor-pointer bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] font-poppins text-slate-100 dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C] transition duration-300 hover:text-zinc-200 dark:hover:text-zinc-50"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            + Add Health Record
          </Button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-sm text-zinc-500">Loading records…</div>
      )}

      {/* Empty */}
      {!loading && records.length === 0 && (
        <div className="text-sm text-zinc-500">
          No health records found.
        </div>
      )}

      {/* Records */}
      {!loading && records.length > 0 && (
        <div className="space-y-4">
          {records.map((r) => (
            <div
              key={r._id}
              className="bg-white dark:bg-zinc-800 border rounded-lg p-4 shadow-sm"
            >
              {/* Top Row */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-poppins">{r.type}</div>
                  <div className="text-sm text-zinc-500 font-rubik">
                    {new Date(r.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {r.createdBy && (
                    <div className="text-sm text-zinc-600 dark:text-zinc-300 font-poppins">
                      By {r.createdBy.name} ({r.createdBy.role})
                    </div>
                  )}

                  {canEdit && (
                    <button
                      onClick={() => {
                        setEditing(r);
                        setOpen(true);
                      }}
                      className="p-2 cursor-pointer transition duration-100 rounded hover:bg-zinc-100  text-blue-600 dark:hover:bg-zinc-700 dark:text-yellow-500"
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
                      className="text-red-600 hover:text-red-800"
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

              {/* Next Due */}
              {r.nextDueDate && (
                <div className="mt-2 text-sm text-red-600 font-poppins ">
                  Next due:{" "}
                  {new Date(r.nextDueDate).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
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
