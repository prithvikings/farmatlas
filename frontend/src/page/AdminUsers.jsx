import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import CreateUserModal from "../components/CreateUserModal";
import { Button } from "../components/ui/button";
import api from "../lib/axios";
import UserTable from "../components/UserTable";
import UserTableSkeleton from "../components/ui/UserTableSkeleton";


const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users",err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-medium font-poppins">Users</h1>
        <Button
          className="cursor-pointer bg-gradient-to-b from-[#EA580C] via-[#ec7d2d] to-[#e77f34] font-poppins text-slate-100 shadow-lg hover:shadow-xl dark:from-[#e77f34] dark:via-[#ec7d2d] dark:to-[#EA580C] transition duration-300 "
          onClick={() => setOpen(true)}
        >
          + Create User
        </Button>
      </div>

      {loading ? (
  <UserTableSkeleton />
) : (
  <UserTable users={users} />
)}


      <CreateUserModal open={open} setOpen={setOpen} onSuccess={fetchUsers} />
    </>
  );
};

export default AdminUsers;
