import { User2Icon } from "lucide-react";
import { useAuth } from "../context/AuthContext";


const VetLayout = ({ children }) => {
  const { user } = useAuth();
    const role = user?.role
      ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
      : "";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-rubik text-zinc-800 dark:text-zinc-200 font-semibold">
            FarmAtlas
          </div>
          <div className="cursor-pointer flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-4 py-2 rounded-full transition duration-300">
            <User2Icon />
            <span className="text-sm font-medium font-poppins text-zinc-800 dark:text-zinc-200">
              {role}
            </span>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Page Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default VetLayout;
