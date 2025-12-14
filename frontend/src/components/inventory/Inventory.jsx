import { useEffect, useState } from "react";
import api from "../../lib/axios";
import InventoryTable from "./InventoryTable";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";
import InventoryFormModal from "./InventoryFormModal";
import DashboardLayout from "../../layout/DashboardLayout";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
const { user } = useAuth();
const [open, setOpen] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await api.get("/inventory/item");
      setItems(res.data);
    } catch (err) {
      console.error("Failed to load inventory", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-xl font-semibold">Inventory</h1>

  {user.role === "ADMIN" && (
    <Button onClick={() => setOpen(true)}>+ Add Item</Button>
  )}
</div>


      {loading ? (
        <div className="text-sm text-zinc-500">Loading inventory…</div>
      ) : (
        <InventoryTable items={items} />
      )}

      <InventoryFormModal
  open={open}
  setOpen={setOpen}
  onSuccess={fetchItems}
/>

    </DashboardLayout>
  );
};

export default Inventory;
