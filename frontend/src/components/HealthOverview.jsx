import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import HealthFormModal from "./animals/HealthFormModal";

const HealthOverview = () => {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Health Records</h1>

        
      </div>

      {loading ? (
        <div className="text-sm text-zinc-500">
          Loading health records…
        </div>
      ) : records.length === 0 ? (
        <div className="text-sm text-zinc-500">
          No health records found.
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-700">
              <tr>
                <th className="p-3 text-left">Animal</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Medication</th>
                <th className="p-3 text-left">Notes</th>
                {canEdit && (
                  <th className="p-3 text-right">Action</th>
                )}
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr key={r._id} className="border-t">
                  <td className="p-3">
                    {r.animalId?.tagNumber} — {r.animalId?.name}
                  </td>
                  <td className="p-3">{r.type}</td>
                  <td className="p-3">
                    {new Date(r.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{r.medication || "—"}</td>
                  <td className="p-3 max-w-xs truncate">
                    {r.notes}
                  </td>

                  {canEdit && (
                    <td className="p-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingRecord(r);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
