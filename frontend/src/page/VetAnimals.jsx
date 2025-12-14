import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Link } from "react-router-dom";

const VetAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/animals")
      .then(res => setAnimals(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-sm text-zinc-500">Loading animals…</div>;
  }

  return (
    <>
      <h1 className="text-xl font-semibold mb-6">Animals</h1>

      <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-700">
            <tr>
              <th className="p-3 text-left">Tag</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Species</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Health</th>
            </tr>
          </thead>
          <tbody>
            {animals.map(a => (
              <tr key={a._id} className="border-t">
                <td className="p-3">{a.tagNumber}</td>
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.species}</td>
                <td className="p-3">{a.status}</td>
                <td className="p-3 text-right">
                  <Link
                    to={`/vet/animals/${a._id}/health`}
                    className="text-indigo-600 text-sm hover:underline"
                  >
                    View / Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VetAnimals;
