import { User2Icon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProfileBadge from "../components/ui/ProfileBadge";

const WorkerLayout = ({ children }) => {
  const { user } = useAuth();
  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
    : "";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="
  text-3xl font-poppins font-semibold leading-tight
  bg-gradient-to-b from-slate-700 to-neutral-900
  text-transparent bg-clip-text
  dark:from-zinc-100 dark:to-zinc-400
">FarmAtlas</div>

          <Link
            to="profile"
            className="
            shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]
            flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition duration-300"
          >
            <User2Icon />
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">
                {user?.name || role}
              </span>
              <ProfileBadge percent={user.profileCompletion ?? 0} />
            </div>
          </Link>
        </div>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default WorkerLayout;
