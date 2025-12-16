import { useEffect, useState } from "react";
import api from "../lib/axios";
import AnimalTable from "./animals/AnimalTable";
import AnimalFormModal from "./animals/AnimalFormModal";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import AnimalTableSkeleton from "./animals/AnimalTableSkeleton";
import AnimalCard from "./animals/AnimalCard";
import { useOutletContext } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Animals = () => {
  const { user } = useAuth();
  const { sidebarOpen, toggleSidebar } = useOutletContext() || {};
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);

  const isAdmin = user?.role === "ADMIN";

  const fetchAnimals = async () => {
    try {
      const res = await api.get("/animals");
      setAnimals(res.data);
    } catch (err) {
      console.error("Failed to load animals", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleCreate = () => {
    setEditingAnimal(null);
    setOpen(true);
  };

  const handleEdit = (animal) => {
    if (!isAdmin) return;
    setEditingAnimal(animal);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (!confirm("Delete this animal?")) return;
    await api.delete(`/animals/${id}`);
    fetchAnimals();
  };

  return (
    <>
      <div className="flex flex-col gap-4 mb-6">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl md:text-3xl font-medium font-poppins">
            Animals
          </h1>

          {/* Mobile hamburger on right */}
          {toggleSidebar && (
            <button
              onClick={toggleSidebar}
              className="
      lg:hidden p-2 rounded-md border
      bg-white dark:bg-zinc-800
      hover:bg-zinc-200 dark:hover:bg-zinc-700
      transition-transform duration-200
    "
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X size={22} className="transition-transform rotate-90" />
              ) : (
                <Menu size={22} className="transition-transform rotate-0" />
              )}
            </button>
          )}
        </div>

        {/* Action row */}
        {isAdmin && (
          <div className="flex justify-end">
            <Button
              className="w-full sm:w-auto cursor-pointer
                   bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34]
                   font-poppins text-slate-100 shadow-lg hover:shadow-xl
                   dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C]
                   transition duration-300"
              onClick={handleCreate}
            >
              + Add Animal
            </Button>
          </div>
        )}
      </div>

      {loading ? (
        <AnimalTableSkeleton />
      ) : animals.length === 0 ? (
        <div className="text-sm text-zinc-500 font-poppins">
          No animals found.
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {animals.map((animal) => (
              <AnimalCard
                key={animal._id}
                animal={animal}
                canEdit={isAdmin}
                canDelete={isAdmin}
                canFeed={user.role === "ADMIN" || user.role === "WORKER"}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block">
            <AnimalTable
              animals={animals}
              canEdit={isAdmin}
              canDelete={isAdmin}
              canFeed={user.role === "ADMIN" || user.role === "WORKER"}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}

      {isAdmin && (
        <AnimalFormModal
          open={open}
          setOpen={setOpen}
          animal={editingAnimal}
          onSuccess={fetchAnimals}
        />
      )}
    </>
  );
};

export default Animals;
