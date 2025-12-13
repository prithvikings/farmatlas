import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AnimalFormModal = ({ open, setOpen, animal, onSuccess }) => {
  const [form, setForm] = useState({
    tagNumber: "",
    name: "",
    species: "",
    gender: "MALE",

    // enrichment fields
    breed: "",
    status: "ACTIVE",
    location: "",
    dateOfBirth: "",
    acquisitionDate: "",
  });

  useEffect(() => {
    if (animal) {
      setForm({
        tagNumber: animal.tagNumber || "",
        name: animal.name || "",
        species: animal.species || "",
        gender: animal.gender || "MALE",

        breed: animal.breed || "",
        status: animal.status || "ACTIVE",
        location: animal.location || "",
        dateOfBirth: animal.dateOfBirth
          ? animal.dateOfBirth.slice(0, 10)
          : "",
        acquisitionDate: animal.acquisitionDate
          ? animal.acquisitionDate.slice(0, 10)
          : "",
      });
    } else {
      // reset on create
      setForm({
        tagNumber: "",
        name: "",
        species: "",
        gender: "MALE",
        breed: "",
        status: "ACTIVE",
        location: "",
        dateOfBirth: "",
        acquisitionDate: "",
      });
    }
  }, [animal, open]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (animal) {
      await api.put(`/animals/${animal._id}`, form);
    } else {
      await api.post("/animals", {
        tagNumber: form.tagNumber,
        name: form.name,
        species: form.species,
        gender: form.gender,
      });
    }

    setOpen(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-[420px]">
        <h2 className="text-lg font-medium mb-4">
          {animal ? "Edit Animal" : "Add Animal"}
        </h2>

        <div className="space-y-3">
          <Input
            placeholder="Tag Number"
            value={form.tagNumber}
            onChange={(e) =>
              setForm({ ...form, tagNumber: e.target.value })
            }
          />

          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="Species"
            value={form.species}
            onChange={(e) =>
              setForm({ ...form, species: e.target.value })
            }
          />

          {/* ENRICHMENT — EDIT MODE ONLY */}
          {animal && (
            <>
              <Input
                placeholder="Breed"
                value={form.breed}
                onChange={(e) =>
                  setForm({ ...form, breed: e.target.value })
                }
              />

              <Input
                placeholder="Location"
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
              />

              <select
                className="w-full border rounded px-3 py-2 text-sm dark:bg-zinc-800"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option value="ACTIVE">Active</option>
                <option value="SICK">Sick</option>
                <option value="SOLD">Sold</option>
                <option value="DEAD">Dead</option>
                <option value="TRANSFERRED">Transferred</option>
                <option value="MISSING">Missing</option>
              </select>

              <Input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) =>
                  setForm({ ...form, dateOfBirth: e.target.value })
                }
              />

              <Input
                type="date"
                value={form.acquisitionDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    acquisitionDate: e.target.value,
                  })
                }
              />
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {animal ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnimalFormModal;
