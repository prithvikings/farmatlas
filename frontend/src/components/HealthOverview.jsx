import { useEffect, useState } from "react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const HealthOverview = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/health")
      .then((res) => setRecords(res.data))
      .catch((err) => console.error("Failed to load health records", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-zinc-500">
        Loading health records…
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-sm text-zinc-500">
        No health records found.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">
          Health Timeline
        </h1>

        {/* ADMIN / VET ONLY ACTIONS */}
        {(user.role === "ADMIN" || user.role === "VET") && (
          <span className="text-xs text-zinc-500">
            Full access enabled
          </span>
        )}
      </div>

      <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-700">
            <tr>
              <th className="p-3 text-left">Animal</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Medication</th>
              <th className="p-3 text-left">Notes</th>
              <th className="p-3 text-left">Logged By</th>
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
                <td className="p-3">
                  {r.medication || "—"}
                </td>
                <td className="p-3 max-w-xs truncate">
                  {r.notes}
                </td>
                <td className="p-3">
                  {r.createdBy?.name || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HealthOverview;
