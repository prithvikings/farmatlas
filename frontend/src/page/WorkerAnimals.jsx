import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Link, useOutletContext } from "react-router-dom";
import DataTableSkeleton from "../components/skelton/DataTableSkeleton";
import { Menu, X } from "lucide-react";

const WorkerAnimals = () => {
  const { sidebarOpen, toggleSidebar } = useOutletContext() || {};
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
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">
        {loading ? (
          <div className="h-8 w-40 rounded shimmer bg-zinc-300 dark:bg-zinc-700" />
        ) : (
          <h1 className="text-3xl font-medium font-poppins">Animals</h1>
        )}

        {/* Mobile hamburger (same as Admin) */}
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="
              lg:hidden p-2 rounded-md border
              bg-white dark:bg-zinc-800
              hover:bg-zinc-200 dark:hover:bg-zinc-700
              transition"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative">
        {/* Skeleton */}
        {loading && (
          <div className="absolute inset-0 z-10">
            <DataTableSkeleton columns={5} rows={6} />
          </div>
        )}

        <div
          className={`transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {animals.length === 0 ? (
            <div className="text-sm text-zinc-500 font-poppins">
              No animals found.
            </div>
          ) : (
            <>
              {/* ========== MOBILE CARDS (same colors, no custom theme) ========== */}
              <div className="grid grid-cols-1 gap-4 sm:hidden">
                {animals.map((animal) => (
                  <div
                    key={animal._id}
                    className="bg-white dark:bg-zinc-800 border rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <div>
                        <div className="font-medium">{animal.name}</div>
                        <div className="text-xs text-zinc-500">
                          Tag: {animal.tagNumber}
                        </div>
                      </div>

                      <span className="text-xs px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 flex items-center font-poppins">
                        {animal.status === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                      Species: {animal.species}
                    </div>

                    <Link
                      to={`/animals/${animal._id}/feeding`}
                      className="
                        inline-block text-sm px-4 py-2 rounded
                        bg-zinc-200 dark:bg-zinc-900
                        hover:bg-zinc-200 dark:hover:bg-zinc-600
                        transition font-poppins"
                    >
                      Feed
                    </Link>
                  </div>
                ))}
              </div>

              {/* ========== DESKTOP TABLE (UNCHANGED) ========== */}
              <div className="hidden sm:block bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-100 dark:bg-zinc-700 font-lato">
                    <tr>
                      <th className="p-3 text-left">Tag</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Species</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-right">Action</th>
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
                            to={`/animals/${animal._id}/feeding`}
                            className="
                              p-2 rounded transition
                              text-orange-400
                              hover:bg-zinc-100
                              dark:hover:bg-zinc-700"
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
          )}
        </div>
      </div>
    </>
  );
};

export default WorkerAnimals;
