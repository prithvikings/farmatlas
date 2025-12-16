import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Link, useOutletContext } from "react-router-dom";
import DataTableSkeleton from "../components/skelton/DataTableSkeleton";
import { Menu, X } from "lucide-react";

const VetAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const { sidebarOpen, toggleSidebar } = useOutletContext() || {};

  useEffect(() => {
    api
      .get("/animals")
      .then((res) => setAnimals(res.data))
      .catch(console.error)
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

        {/* Mobile hamburger */}
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="
              lg:hidden p-2 rounded-md border
              bg-white dark:bg-zinc-800
              hover:bg-zinc-200 dark:hover:bg-zinc-700
              transition
            "
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      {loading ? (
        <DataTableSkeleton columns={5} rows={6} />
      ) : animals.length === 0 ? (
        <div className="text-sm text-zinc-500 font-poppins">
          No animals found.
        </div>
      ) : (
        <>
          {/* -------- Mobile cards -------- */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {animals.map((animal) => (
              <div
                key={animal._id}
                className="bg-white dark:bg-zinc-800 border rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-500">Tag</span>
                  <span className="font-medium">{animal.tagNumber}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-zinc-500">Name</span>
                  <span>{animal.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-zinc-500">Species</span>
                  <span>{animal.species}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-zinc-500">Status</span>
                  <span>{animal.status}</span>
                </div>

                <div className="pt-2 flex justify-end">
                  <Link
                    to={`/vet/animals/${animal._id}/health`}
                    className="p-2 rounded text-[#EA580C]
                      hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  >
                    View / Update
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* -------- Desktop table -------- */}
          <div className="hidden sm:block">
            <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
              <table className="w-full text-sm font-lato">
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
          </div>
        </>
      )}
    </>
  );
};

export default VetAnimals;
