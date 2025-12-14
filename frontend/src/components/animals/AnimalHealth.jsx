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
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Health Records</h1>

        {canCreate && (
          <Button
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
              className="bg-white dark:bg-zinc-800 border rounded-lg p-4"
            >
              {/* Top Row */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{r.type}</div>
                  <div className="text-sm text-zinc-500">
                    {new Date(r.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {r.createdBy && (
                    <div className="text-sm text-zinc-500">
                      By {r.createdBy.name} ({r.createdBy.role})
                    </div>
                  )}

                  {canEdit && (
                    <button
                      onClick={() => {
                        setEditing(r);
                        setOpen(true);
                      }}
                      className="text-zinc-600 hover:text-zinc-900"
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
              <div className="mt-2 text-sm">{r.notes}</div>

              {/* Medication */}
              {r.medication && (
                <div className="mt-2 text-sm text-zinc-600">
                  💊 {r.medication}
                  {r.dosage && ` — ${r.dosage}`}
                </div>
              )}

              {/* Next Due */}
              {r.nextDueDate && (
                <div className="mt-1 text-xs text-red-600">
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
    </AdminLayout>
  );
};

export default AnimalHealth;
