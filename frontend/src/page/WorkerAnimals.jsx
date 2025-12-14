import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Link } from "react-router-dom";

const WorkerAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/animals")
      .then(res => setAnimals(res.data))
      .catch(err => console.error("Failed to load animals", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-sm text-zinc-500">Loading animals…</div>;
  }

  if (!animals.length) {
    return (
      <div className="text-sm text-zinc-500">
        No animals found.
      </div>
    );
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
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {animals.map(animal => (
              <tr key={animal._id} className="border-t">
                <td className="p-3">{animal.tagNumber}</td>
                <td className="p-3">{animal.name}</td>
                <td className="p-3">{animal.species}</td>
                <td className="p-3">{animal.status}</td>
                <td className="p-3 text-right">
                  <Link
                    to={`/animals/${animal._id}/feeding`}
                    className="text-indigo-600 hover:underline text-sm font-medium"
                  >
                    Feed
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

export default WorkerAnimals;
