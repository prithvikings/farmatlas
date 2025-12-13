import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import api from "../lib/axios";
import AnimalTable from "./animals/AnimalTable";
import AnimalFormModal from "./animals/AnimalFormModal";
import { Button } from "./ui/button";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);

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
    setEditingAnimal(animal);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this animal?")) return;
    await api.delete(`/animals/${id}`);
    fetchAnimals();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Animals</h1>
        <Button onClick={handleCreate}>+ Add Animal</Button>
      </div>

      {loading ? (
  <div className="text-sm text-zinc-500">Loading animals…</div>
) : animals.length === 0 ? (
  <div className="text-sm text-zinc-500">
    No animals yet. Click “Add Animal” to create one.
  </div>
) : (
  <AnimalTable
    animals={animals}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
)}


      <AnimalFormModal
        open={open}
        setOpen={setOpen}
        animal={editingAnimal}
        onSuccess={fetchAnimals}
      />
    </AdminLayout>
  );
};

export default Animals;
