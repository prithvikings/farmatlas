// AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Activity,
  Clipboard,
  DollarSign,
  Database,
  Box,
  LogOut,
} from "lucide-react";
import { FiSettings } from "react-icons/fi";

const stats = [
  { id: 1, label: "Total Animals", value: "450" },
  { id: 2, label: "Active Animals", value: "380" },
  { id: 3, label: "Monthly income", value: "₹8,200" },
  { id: 4, label: "Monthly Expenses", value: "₹5,600" },
];

const healthOverview = {
  title: "Health Overview",
  subtitle: "5 Animals",
  details: "with Health Issues",
};

const feedingLog = [
  {
    id: 1,
    title: "Cattle Feed Type A",
    subtitle: "Hay",
    amount: "-50 kg",
    date: "April 23, 2024",
  },
  {
    id: 2,
    title: "Vitamin Supplements",
    subtitle: "20 ug",
    amount: "-20 units",
    date: "April 23, 2024",
  },
  {
    id: 3,
    title: "Deworming Medication",
    subtitle: "20 Ag",
    amount: "-8 units",
    date: "April 23, 2024",
  },
];

const recentFeeding = [
  { id: 1, name: "Daisy", type: "Hay", amount: "5 kg" },
  { id: 2, name: "Max", type: "Grain", amount: "3 kg" },
  { id: 3, name: "Bella", type: "Silage", amount: "8 kg" },
];

const StatCard = ({ label, value }) => (
  <div className="bg-white   dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 shadow-sm flex flex-col">
    <div className="text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
    <div className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-2">
      {value}
    </div>
  </div>
);

const LargeCard = ({ title, children, action }) => (
  <div className="bg-white  dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      {action && (
        <div className="text-sm text-[#F97316] cursor-pointer">{action}</div>
      )}
    </div>
    <div>{children}</div>
  </div>
);

const FeedItem = ({ item }) => (
  <div className="flex justify-between items-start py-3 border-t first:border-t-0">
    <div>
      <div className="font-medium text-zinc-900 dark:text-zinc-100">
        {item.title}
      </div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {item.subtitle}
      </div>
    </div>
    <div className="font-semibold text-zinc-900 dark:text-zinc-100">
      {item.amount}
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-[1200px] mx-auto bg-transparent">
        {/* Top area */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-inter">FarmAtlas</div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-zinc-700 dark:text-zinc-200  font-poppins font-medium">
              Admin
            </div>
            <button className="p-2 rounded-md hover:bg-white/40 dark:hover:bg-zinc-800 cursor-pointer">
              <FiSettings />
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-lg font-semibold mb-6 font-inter">
                Livestock Manager
              </div>

              <nav className="space-y-2 text-zinc-700 dark:text-zinc-200">
                <Link
                  to="/admin"
                  className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 font-lato"
                >
                  <Grid size={18} /> Dashboard
                </Link>
                <Link
                  to="/admin/animals"
                  className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 font-lato"
                >
                  <Activity size={18} /> Animals
                </Link>
                <Link
                  to="/admin/health"
                  className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 font-lato"
                >
                  <Clipboard size={18} /> Health Records
                </Link>
                <Link
                  to="/admin/feeding"
                  className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 font-lato"
                >
                  <Box size={18} /> Feeding
                </Link>
                <Link
                  to="/admin/inventory"
                  className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 font-lato"
                >
                  <Database size={18} /> Inventory
                </Link>
                <Link
                  to="/admin/financials"
                  className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 font-lato"
                >
                  <DollarSign size={18} /> Financials
                </Link>
              </nav>
            </div>

            <div className="mt-6 pt-4 border-t">
              <Link
                to="/logout"
                className="flex items-center gap-3 text-sm text-zinc-700   dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-100 font-poppins"
              >
                <LogOut size={16} /> Log out
              </Link>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {/* stat row */}
            <div className="grid grid-cols-4 gap-4 mb-6 font-lato">
              {stats.map((s) => (
                <StatCard key={s.id} label={s.label} value={s.value} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* left big column */}
              <div className="col-span-2 space-y-6">
                <LargeCard
                  title={healthOverview.title}
                  action={
                    <span className="text-sm text-[#F97316] dark:text-[#EA580C] cursor-pointer font-roboto ">
                      View Details
                    </span>
                  }
                >
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 font-inter">
                      {healthOverview.subtitle}
                    </div>
                    <div className="mt-2 text-zinc-600 dark:text-zinc-400 font-poppins">
                      {healthOverview.details}
                    </div>
                  </div>
                </LargeCard>

                <LargeCard
                  title="Feeding Log"
                  action={
                    <span className="text-sm text-[#F97316]-600 dark:text-[#F97316]-400 font-roboto">
                      View All
                    </span>
                  }
                >
                  <div className="text-sm text-zinc-500 mb-3 font-poppins">
                    April 23, 2024
                  </div>
                  <div className="divide-y">
                    {recentFeeding.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
                            {/* small icon placeholder */}
                            🐄
                          </div>
                          <div>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100 font-lato">
                              {r.name}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-roboto">
                              {r.type}
                            </div>
                          </div>
                        </div>
                        <div className="text-zinc-700 dark:text-zinc-400 font-inter">
                          {r.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </LargeCard>
              </div>

              {/* right column */}
              <div className="space-y-6 font-roboto">
                <LargeCard
                  title="Feeding Log"
                  action={
                    <span className="text-sm text-[#F97316]">View All</span>
                  }
                >
                  <div className="text-sm text-zinc-500 mb-3">
                    April 23, 2024
                  </div>
                  <div>
                    {feedingLog.map((f) => (
                      <FeedItem key={f.id} item={f} />
                    ))}
                  </div>
                </LargeCard>

                <LargeCard title="Quick Summary">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Income this month
                      </div>
                      <div className="font-semibold">₹8,200</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Expenses this month
                      </div>
                      <div className="font-semibold text-red-600 dark:text-red-400">
                        ₹5,600
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Active animals
                      </div>
                      <div className="font-semibold">380</div>
                    </div>
                  </div>
                </LargeCard>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
