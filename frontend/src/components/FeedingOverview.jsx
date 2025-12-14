import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Button } from "./ui/button";
import FeedingLogModal from "./FeedingLogModal";
import { useAuth } from "../context/AuthContext";

const FeedingOverview = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);

  const canCreate = user.role === "ADMIN" || user.role === "WORKER";

  const fetchLogs = async () => {
    const res = await api.get("/feeding");
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-medium font-poppins">Feeding Activity</h1>

        {canCreate && (
          <Button
            className="cursor-pointer bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] font-poppins text-slate-100 shadow-lg hover:shadow-xl dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C] transition duration-300 "
            onClick={() => setOpen(true)}
          >
            + Log Feeding
          </Button>
        )}
      </div>

      {!logs.length ? (
        <div className="text-sm text-zinc-500">No feeding activity yet.</div>
      ) : (
        <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-700 font-roboto">
              <tr>
                <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                  Animal
                </th>
                <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                  Food
                </th>
                <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                  Quantity
                </th>
                <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                  Fed By
                </th>
                <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log._id}
                  className="border-t font-poppins font-medium odd:bg-zinc-50 dark:odd:bg-zinc-800 even:bg-zinc-00 dark:even:bg-zinc-900"
                >
                  <td className="p-3 text-zinc-900 dark:text-zinc-200">
                    {log.animalId?.tagNumber} – {log.animalId?.name}
                  </td>
                  <td className="p-3 text-zinc-900 dark:text-zinc-200">
                    {log.foodType}
                  </td>
                  <td className="p-3 text-zinc-900 dark:text-zinc-200">
                    {log.quantity} {log.unit}
                  </td>
                  <td className="p-3 text-zinc-900 dark:text-zinc-200">
                    {log.loggedBy?.name} ({log.loggedBy?.role})
                  </td>
                  <td className="p-3 font-light text-zinc-900 dark:text-zinc-400">
                    {new Date(log.dateTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {canCreate && (
        <FeedingLogModal open={open} setOpen={setOpen} onSuccess={fetchLogs} />
      )}
    </>
  );
};

export default FeedingOverview;
