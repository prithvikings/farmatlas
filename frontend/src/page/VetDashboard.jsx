// VetDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Heart, AlertTriangle, Calendar, Database, LogOut } from "lucide-react";
import { FiSettings } from "react-icons/fi";

const healthAlerts = [
  { id: 1, animal: "Bella", issue: "High temperature", severity: "High" },
  { id: 2, animal: "Rocky", issue: "Low appetite", severity: "Medium" },
  { id: 3, animal: "Daisy", issue: "Limping", severity: "Medium" },
];

const upcomingCheckups = [
  { id: 1, animal: "Molly", date: "April 25, 2024", purpose: "Vaccination" },
  { id: 2, animal: "Leo", date: "April 26, 2024", purpose: "Routine Checkup" },
  { id: 3, animal: "Shadow", date: "April 28, 2024", purpose: "Injury Follow-up" },
];

const medicationUsage = [
  { id: 1, name: "Antibiotics", used: "-12 units" },
  { id: 2, name: "Painkillers", used: "-8 units" },
  { id: 3, name: "Dewormer", used: "-5 units" },
];

const Card = ({ title, children, action }) => (
  <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-medium text-zinc-900">{title}</h3>
      {action && <span className="text-sm text-blue-600 cursor-pointer">{action}</span>}
    </div>
    {children}
  </div>
);

export default function VetDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-inter">FarmAtlas</div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-zinc-700 font-medium">Veterinarian</div>
            <button className="p-2 rounded-md hover:bg-white/40">
              <FiSettings />
            </button>
          </div>
        </div>

        <div className="flex gap-6">

          {/* Sidebar */}
          <aside className="w-64 bg-white rounded-lg border border-zinc-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-lg font-semibold mb-6">Vet Panel</div>

              <nav className="space-y-2 text-zinc-700">
                <Link to="/vet" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-50">
                  <Heart size={18} /> Health Dashboard
                </Link>

                <Link to="/vet/checkups" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-50">
                  <Calendar size={18} /> Scheduled Checkups
                </Link>

                <Link to="/vet/records" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-50">
                  <Heart size={18} /> Medical Records
                </Link>

                <Link to="/vet/inventory" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-50">
                  <Database size={18} /> Medicine Inventory
                </Link>
              </nav>
            </div>

            <div className="mt-6 pt-4 border-t">
              <Link to="/logout" className="flex items-center gap-3 text-sm text-zinc-700 hover:text-zinc-900">
                <LogOut size={16} /> Log out
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">

            {/* Alerts */}
            <Card 
              title="Health Alerts" 
              action="View All"
            >
              <div className="divide-y">
                {healthAlerts.map((a) => (
                  <div key={a.id} className="py-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium">{a.animal}</div>
                      <div className="text-sm text-zinc-600">{a.issue}</div>
                    </div>
                    <div className={`text-sm font-semibold ${
                      a.severity === "High" ? "text-red-600" : "text-yellow-600"
                    }`}>
                      {a.severity}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Checkups */}
            <Card title="Upcoming Checkups" action="View All">
              <div className="divide-y">
                {upcomingCheckups.map((c) => (
                  <div key={c.id} className="py-3 flex justify-between">
                    <div>
                      <div className="font-medium">{c.animal}</div>
                      <div className="text-sm text-zinc-600">{c.purpose}</div>
                    </div>
                    <div className="text-sm text-zinc-700">{c.date}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Medication Usage */}
            <Card title="Medication Usage">
              <div className="divide-y">
                {medicationUsage.map((m) => (
                  <div key={m.id} className="py-3 flex justify-between">
                    <span className="text-zinc-700">{m.name}</span>
                    <span className="font-semibold">{m.used}</span>
                  </div>
                ))}
              </div>
            </Card>

          </main>
        </div>
      </div>
    </div>
  );
}
