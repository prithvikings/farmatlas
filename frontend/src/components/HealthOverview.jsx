import { useEffect, useState } from "react";
import api from "../lib/axios";
import AdminLayout from "../layout/AdminLayout";

const HealthOverview = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchHealth();
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Health Records</h1>
      </div>

      {loading ? (
        <div className="text-sm text-zinc-500">Loading health records…</div>
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
      )}
    </AdminLayout>
  );
};

export default HealthOverview;
