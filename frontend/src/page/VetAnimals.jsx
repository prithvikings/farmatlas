import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Link } from "react-router-dom";
import DataTableSkeleton from "../components/skelton/DataTableSkeleton";


const VetAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/animals")
      .then((res) => setAnimals(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

 

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {loading ? (
          <div className="h-8 w-56 rounded shimmer shimmer-delay-8 bg-zinc-300 dark:bg-zinc-700" />
        ) : (
          <h1 className="text-3xl font-medium font-poppins">
            Animals
          </h1>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <DataTableSkeleton columns={5} rows={6} />
      ) : animals.length === 0 ? (
        <div className="text-sm text-zinc-500">
          No animals found.
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
          <table className="w-full text-sm shadow-2xl font-lato">
            <thead className="bg-zinc-100 dark:bg-zinc-700 font-roboto">
              <tr>
                <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">Tag</th>
                <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">Name</th>
                <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">Species</th>
                <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">Status</th>
                <th className="p-3 text-right text-zinc-800 dark:text-zinc-300">Health</th>
              </tr>
            </thead>

            <tbody>
              {animals.map((animal) => (
                <tr
                  key={animal._id}
                  className="border-t font-poppins font-medium
                    odd:bg-zinc-50 dark:odd:bg-zinc-800
                    even:bg-white dark:even:bg-zinc-900"
                >
                  <td className="p-3">{animal.tagNumber}</td>
                  <td className="p-3">{animal.name}</td>
                  <td className="p-3">{animal.species}</td>
                  <td className="p-3">{animal.status}</td>
                  <td className="p-3 text-right">
                    <Link
                      to={`/vet/animals/${animal._id}/health`}
                      className="p-2 rounded text-[#EA580C]
                        hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    >
                      View / Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default VetAnimals;
