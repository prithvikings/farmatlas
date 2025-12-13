import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/axios";
import AdminLayout from "../layout/AdminLayout";
import { Button } from "../components/ui/button";

const AnimalHealthTimeline = () => {
  const { animalId } = useParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Animal Health History</h1>

        {/* ADMIN / VET will get Add button in Part C */}
        <Button variant="outline" disabled>
          + Add Record
        </Button>
      </div>

      {loading ? (
        <div className="text-sm text-zinc-500">Loading health history…</div>
      ) : records.length === 0 ? (
        <div className="text-sm text-zinc-500">
          No health records for this animal.
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((r) => (
            <div
              key={r._id}
              className="bg-white dark:bg-zinc-800 border rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{r.type}</div>
                  <div className="text-xs text-zinc-500">
                    {new Date(r.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="text-xs text-zinc-500">
                  By: {r.createdBy?.name || "—"}
                </div>
              </div>

              <div className="mt-2 text-sm">{r.notes}</div>

              {(r.medication || r.dosage) && (
                <div className="mt-2 text-xs text-zinc-600">
                  Medication: {r.medication || "—"}{" "}
                  {r.dosage ? `(${r.dosage})` : ""}
                </div>
              )}

              {r.nextDueDate && (
                <div className="mt-1 text-xs text-orange-600">
                  Next due:{" "}
                  {new Date(r.nextDueDate).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AnimalHealthTimeline;
