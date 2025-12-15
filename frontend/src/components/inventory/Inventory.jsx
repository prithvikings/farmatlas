import { useEffect, useState } from "react";
import api from "../../lib/axios";
import InventoryTable from "./InventoryTable";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";
import InventoryFormModal from "./InventoryFormModal";
import DataTableSkeleton from "../skelton/DataTableSkeleton";

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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {loading ? (
          <div className="h-8 w-40 rounded shimmer shimmer-delay-1 bg-zinc-300 dark:bg-zinc-700" />
        ) : (
          <h1 className="text-3xl font-semibold font-poppins">
            Inventory
          </h1>
        )}

        {user?.role === "ADMIN" && !loading && (
          <Button
            className="cursor-pointer bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34]
              font-poppins text-slate-100 shadow-lg hover:shadow-xl
              dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C]
              transition duration-300"
            onClick={() => setOpen(true)}
          >
            + Add Item
          </Button>
        )}
      </div>

      {/* Content wrapper (IMPORTANT) */}
      <div className="relative">
        {/* Skeleton overlay */}
        {loading && (
          <div className="absolute inset-0 z-10">
            {/* Adjust columns if InventoryTable has more/less */}
            <DataTableSkeleton columns={5} rows={6} />
          </div>
        )}

        {/* Real content (always mounted) */}
        <div
          className={`transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          <InventoryTable
            items={items}
            canManage={user?.role === "ADMIN"}
          />
        </div>
      </div>

      {/* Modal */}
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
