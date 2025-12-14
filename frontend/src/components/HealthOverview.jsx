import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import HealthFormModal from "./animals/HealthFormModal";
import { Pencil } from "lucide-react";

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
        <h1 className="text-3xl font-medium font-poppins">Health Records</h1>
      </div>

      {loading ? (
        <div className="text-sm text-zinc-500">Loading health records…</div>
      ) : records.length === 0 ? (
        <div className="text-sm text-zinc-500">No health records found.</div>
      ) : (
        <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
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
