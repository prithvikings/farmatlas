import { useEffect, useState } from "react";
import api from "../lib/axios";
import AdminLayout from "../layout/AdminLayout";

const FeedingOverview = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/feeding").then((res) => setLogs(res.data));
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-xl font-semibold mb-6">Feeding Activity</h1>

      {!logs.length ? (
        <div className="text-sm text-zinc-500">No feeding activity yet.</div>
      ) : (
        <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-700">
              <tr>
                <th className="p-3 text-left">Animal</th>
                <th className="p-3 text-left">Food</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Fed By</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-t">
                  <td className="p-3">
                    {log.animalId?.tagNumber} – {log.animalId?.name}
                  </td>
                  <td className="p-3">{log.foodType}</td>
                  <td className="p-3">
                    {log.quantity} {log.unit}
                  </td>
                  <td className="p-3">
                    {log.loggedBy?.name} ({log.loggedBy?.role})
                  </td>
                  <td className="p-3">
                    {new Date(log.dateTime).toLocaleString()}
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

export default FeedingOverview;
