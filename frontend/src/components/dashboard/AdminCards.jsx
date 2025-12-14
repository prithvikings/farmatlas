export const StatCard = ({ label, value }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 flex flex-col transition duration-300 ease-in-out shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
    <div className="text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
    <div className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-2 font-inter">
      {value}
    </div>
  </div>
);

export const LargeCard = ({ title, action, children }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 transition duration-300 ease-in-out shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 font-poppins">
        {title}
      </h3>
      {action && (
        <span className="text-sm text-[#F97316] cursor-pointer">{action}</span>
      )}
    </div>
    {children}
  </div>
);
