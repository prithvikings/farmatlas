import { User2Icon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProfileBadge from "../components/ui/ProfileBadge";
import { useOutletContext } from "react-router-dom";
import { Menu } from "lucide-react";
import { Togglebtn } from "../components/togglebtn";
const VetLayout = ({ children }) => {
  const { openSidebar } = useOutletContext() || {};
  const { user } = useAuth();
  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
    : "";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            {openSidebar && (
              <button
                onClick={openSidebar}
                className="lg:hidden p-2 rounded-md border
                   bg-white dark:bg-zinc-800
                   hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <Menu size={22} />
              </button>
            )}

            <div
              className="
        text-2xl sm:text-3xl font-poppins font-semibold leading-tight
        bg-gradient-to-b from-slate-700 to-neutral-900
        text-transparent bg-clip-text
        dark:from-zinc-100 dark:to-zinc-400
      "
            >
              FarmAtlas
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="profile"
              className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800
              p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              <User2Icon />
              <div className="hidden sm:flex flex-col gap-1">
                <span className="text-sm font-medium">
                  {user?.name || role}
                </span>
                <ProfileBadge percent={user.profileCompletion ?? 0} />
              </div>
            </Link>
            <Togglebtn />
          </div>
        </div>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default VetLayout;
