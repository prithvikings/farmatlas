import { FiSettings } from "react-icons/fi";


const WorkerLayout = ({ children }) => {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-inter">FarmAtlas</div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Worker</span>
            <FiSettings className="cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          {/* Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default WorkerLayout;
