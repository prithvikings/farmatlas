import { useState, useEffect } from "react";
import CreateUserModal from "../components/CreateUserModal";
import { Button } from "../components/ui/button";
import api from "../lib/axios";
import UserTable from "../components/UserTable";
import UserCard from "../components/UserCard";
import UserTableSkeleton from "../components/ui/UserTableSkeleton";
import { useOutletContext } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AdminUsers = () => {
  const { sidebarOpen, toggleSidebar } = useOutletContext() || {};
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 mb-6">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium font-poppins">Users</h1>

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
                <Menu size={22} />
              )}
            </button>
          )}
        </div>

        {/* Action row */}
        <div className="flex justify-end">
          <Button
            className="w-full sm:w-auto cursor-pointer
        bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34]
        font-poppins text-slate-100 shadow-lg hover:shadow-xl
        dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C]
        transition duration-300"
            onClick={() => setOpen(true)}
          >
            + Create User
          </Button>
        </div>
      </div>

      {loading ? (
        <UserTableSkeleton />
      ) : (
        <>
          {/* Mobile cards */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {users.map((u) => (
              <UserCard key={u._id} user={u} />
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block">
            <UserTable users={users} />
          </div>
        </>
      )}

      <CreateUserModal open={open} setOpen={setOpen} onSuccess={fetchUsers} />
    </>
  );
};

export default AdminUsers;
