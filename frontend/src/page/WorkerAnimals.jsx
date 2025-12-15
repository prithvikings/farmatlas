import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Link } from "react-router-dom";
import DataTableSkeleton from "../components/skelton/DataTableSkeleton";

const WorkerAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/animals")
      .then((res) => setAnimals(res.data))
      .catch((err) => console.error("Failed to load animals", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {loading ? (
          <div className="h-8 w-40 rounded shimmer shimmer-delay-1 bg-zinc-300 dark:bg-zinc-700" />
        ) : (
          <h1 className="text-3xl font-medium font-poppins">
            Animals
          </h1>
        )}
      </div>

      {/* Content wrapper (important) */}
      <div className="relative">
        {/* Skeleton overlay */}
        {loading && (
          <div className="absolute inset-0 z-10">
            <DataTableSkeleton columns={5} rows={6} />
          </div>
        )}

        {/* Real content (always mounted) */}
        <div
          className={`transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {animals.length === 0 ? (
            <div className="text-sm text-zinc-500">
              No animals found.
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100 dark:bg-zinc-700 font-lato">
                  <tr>
                    <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                      Tag
                    </th>
                    <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                      Name
                    </th>
                    <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                      Species
                    </th>
                    <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                      Status
                    </th>
                    <th className="p-3 text-right text-zinc-800 dark:text-zinc-300">
                      Action
                    </th>
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
                      <td className="p-3 text-zinc-900 dark:text-zinc-200">
                        {animal.tagNumber}
                      </td>
                      <td className="p-3 text-zinc-900 dark:text-zinc-200">
                        {animal.name}
                      </td>
                      <td className="p-3 text-zinc-900 dark:text-zinc-200">
                        {animal.species}
                      </td>
                      <td className="p-3 text-zinc-900 dark:text-zinc-200">
                        {animal.status}
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          to={`/animals/${animal._id}/feeding`}
                          className="p-2 rounded transition duration-100
                            hover:bg-zinc-100 text-blue-600
                            dark:text-yellow-500 dark:hover:bg-zinc-700"
                        >
                          Feed
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkerAnimals;
