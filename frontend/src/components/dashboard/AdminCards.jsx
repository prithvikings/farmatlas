export const StatCard = ({ label, value }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 shadow-sm flex flex-col">
    <div className="text-sm text-zinc-600 dark:text-zinc-400">
      {label}
    </div>
    <div className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-2">
      {value}
    </div>
  </div>
);

export const LargeCard = ({ title, action, children }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      {action && (
        <span className="text-sm text-[#F97316] cursor-pointer">
          {action}
        </span>
      )}
    </div>
    {children}
  </div>
);
