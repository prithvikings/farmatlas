import { useState } from "react";
import api from "../lib/axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CreateUserModal = ({ open, setOpen }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "WORKER",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await api.post("/users/create", form);

      setOpen(false);
      setForm({
        name: "",
        email: "",
        password: "",
        role: "WORKER",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-96">
        <h2 className="text-lg font-medium mb-4">Create User</h2>

        <div className="space-y-3">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <Input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Role selector */}
          <div className="flex gap-2">
            {["WORKER", "VET"].map((r) => (
              <Button
                key={r}
                variant={form.role === r ? "default" : "outline"}
                className="flex-1"
                onClick={() => setForm({ ...form, role: r })}
              >
                {r}
              </Button>
            ))}
          </div>

          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
