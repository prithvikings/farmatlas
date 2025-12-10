// WorkerDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Grid, Clipboard, Box, Database, LogOut } from "lucide-react";
import { FiSettings } from "react-icons/fi";

const feedingSummary = [
  { id: 1, name: "Daisy", type: "Hay", amount: "5 kg" },
  { id: 2, name: "Max", type: "Grain", amount: "3 kg" },
  { id: 3, name: "Bella", type: "Silage", amount: "8 kg" },
];

const feedUsage = [
  { id: 1, title: "Cattle Feed Type A", subtitle: "Hay", amount: "-50 kg" },
  { id: 2, title: "Vitamin Supplements", subtitle: "20 ug", amount: "-20 units" },
  { id: 3, title: "Deworming Medication", subtitle: "20 Ag", amount: "-8 units" },
];

const healthOverview = {
  title: "Health Overview",
  subtitle: "5 Animals",
  details: "need attention",
};

const LargeCard = ({ title, children, action }) => (
  <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-medium text-zinc-900">{title}</h3>
      {action && <div className="text-sm text-blue-600 cursor-pointer">{action}</div>}
    </div>
    {children}
  </div>
);

const FeedItem = ({ item }) => (
  <div className="flex justify-between items-start py-3 border-t first:border-t-0">
    <div>
      <div className="font-medium text-zinc-900">{item.title}</div>
      <div className="text-sm text-zinc-500">{item.subtitle}</div>
    </div>
    <div className="font-semibold text-zinc-900">{item.amount}</div>
  </div>
);

export default function WorkerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1200px] mx-auto bg-transparent">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-inter">FarmAtlas</div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-zinc-700 font-medium">Worker</div>
            <button className="p-2 rounded-md hover:bg-white/40">
              <FiSettings />
            </button>
          </div>
        </div>

        <div className="flex gap-6">

          {/* Sidebar */}
          <aside className="w-64 bg-white rounded-lg border border-zinc-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-lg font-semibold mb-6">Work Panel</div>

              <nav className="space-y-2 text-zinc-700">
                <Link to="/worker" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-zinc-50">
                  <Grid size={18} /> Dashboard
                </Link>

                <Link to="/worker/health" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-zinc-50">
                  <Clipboard size={18} /> Health Monitoring
                </Link>

                <Link to="/worker/feeding" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-zinc-50">
                  <Box size={18} /> Feeding
                </Link>

                <Link to="/worker/inventory" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-zinc-50">
                  <Database size={18} /> Inventory Access
                </Link>
              </nav>
            </div>

            <div className="mt-6 pt-4 border-t">
              <Link to="/logout" className="flex items-center gap-3 text-sm text-zinc-700 hover:text-zinc-900">
                <LogOut size={16} /> Log out
              </Link>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 space-y-6">

            {/* Health Overview */}
            <LargeCard 
              title={healthOverview.title} 
              action={<span className="text-sm text-green-600">Check</span>}
            >
              <div className="flex flex-col items-center justify-center py-10">
                <div className="text-4xl font-bold text-zinc-900">{healthOverview.subtitle}</div>
                <div className="text-zinc-600 mt-2">{healthOverview.details}</div>
              </div>
            </LargeCard>

            {/* Feeding Summary */}
            <LargeCard 
              title="Recent Feeding" 
              action={<span className="text-sm text-green-600">View All</span>}
            >
              <div className="divide-y">
                {feedingSummary.map((f) => (
                  <div key={f.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                        🐄
                      </div>
                      <div>
                        <div className="font-medium">{f.name}</div>
                        <div className="text-xs text-zinc-500">{f.type}</div>
                      </div>
                    </div>
                    <div className="font-medium">{f.amount}</div>
                  </div>
                ))}
              </div>
            </LargeCard>

            {/* Feed Usage */}
            <LargeCard title="Feed Usage Log">
              {feedUsage.map((u) => (
                <FeedItem key={u.id} item={u} />
              ))}
            </LargeCard>
          </main>
        </div>
      </div>
    </div>
  );
}
