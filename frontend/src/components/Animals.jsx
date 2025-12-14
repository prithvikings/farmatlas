import { useEffect, useState } from "react";
import api from "../lib/axios";
import AnimalTable from "./animals/AnimalTable";
import AnimalFormModal from "./animals/AnimalFormModal";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";

const Animals = () => {
  const { user } = useAuth();

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Animals</h1>

        {isAdmin && (
          <Button onClick={handleCreate}>+ Add Animal</Button>
        )}
      </div>

      {loading ? (
        <div className="text-sm text-zinc-500">Loading animals…</div>
      ) : animals.length === 0 ? (
        <div className="text-sm text-zinc-500">No animals found.</div>
      ) : (
        <AnimalTable
          animals={animals}
          canEdit={isAdmin}
          canDelete={isAdmin}
          canFeed={user.role === "ADMIN" || user.role === "WORKER"}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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
