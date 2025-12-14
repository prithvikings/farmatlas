import { useEffect, useState } from "react";
import api from "../../lib/axios";
import InventoryTable from "./InventoryTable";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";
import InventoryFormModal from "./InventoryFormModal";

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
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold font-poppins">Inventory</h1>

        {user?.role === "ADMIN" && (
          <Button
            className="cursor-pointer bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] font-poppins text-slate-100 shadow-lg hover:shadow-xl dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C] transition duration-300 "
            onClick={() => setOpen(true)}
          >
            + Add Item
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-sm text-zinc-500">Loading inventory…</div>
      ) : (
        <InventoryTable items={items} canManage={user?.role === "ADMIN"} />
      )}

      {user?.role === "ADMIN" && (
        <InventoryFormModal
          open={open}
          setOpen={setOpen}
          onSuccess={fetchItems}
        />
      )}
    </>
  );
};

export default Inventory;
