import { useEffect, useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  HeartPulse,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const VetDashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    animalsCount: 0,
    healthAlerts: 0,
    recentIssues: [],
    healthTrend: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/vet/dashboard")
      .then((res) =>
        setData({
          animalsCount: 0,
          healthAlerts: 0,
          recentIssues: [],
          healthTrend: [],
          ...res.data,
        })
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-zinc-500">
        Loading veterinary dashboard…
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">
        Veterinary Dashboard
      </h1>

      {/* ---------------- KPIs ---------------- */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Kpi
          label="Animals Needing Attention"
          value={data.healthAlerts}
          icon={<AlertTriangle />}
          danger={data.healthAlerts > 0}
          onClick={() => navigate("/vet/health")}
        />

        <Kpi
          label="Total Animals"
          value={data.animalsCount}
          icon={<HeartPulse />}
        />

        <Kpi
          label="Recent Health Reports"
          value={data.recentIssues.length}
          icon={<Activity />}
        />
      </div>

      {/* ---------------- CHART ---------------- */}
      <div
        onClick={() => navigate("/vet/health")}
        className="bg-white dark:bg-zinc-800 border rounded-lg p-4 mb-6 cursor-pointer hover:shadow-md transition"
      >
        <h3 className="font-medium mb-3">
          Health Issues Trend (Last 14 Days)
        </h3>

        {data.healthTrend.length === 0 ? (
          <div className="h-[220px] flex items-center justify-center text-sm text-zinc-500">
            No trend data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.healthTrend}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#EF4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        <p className="text-xs text-zinc-400 mt-2">
          Click to open health records
        </p>
      </div>

      {/* ---------------- RECENT ISSUES ---------------- */}
      <div className="bg-white dark:bg-zinc-800 border rounded-lg p-6">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={18} />
          Recent Health Issues
        </h3>

        {data.recentIssues.length === 0 ? (
          <div className="text-sm text-zinc-500">
            No recent illness reports 🎉
          </div>
        ) : (
          <div className="space-y-3">
            {data.recentIssues.map((r, i) => (
              <div
                key={i}
                onClick={() =>
                  navigate(`/vet/animals/${r.animalId}/health`)
                }
                className="border rounded p-3 flex justify-between items-start cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
              >
                <div>
                  <div className="font-medium">
                    {r.animalName} ({r.tagNumber})
                  </div>
                  <div className="text-sm text-zinc-600">
                    {r.issue}
                  </div>
                </div>

                <div className="text-right">
                  <SeverityBadge level={r.severity} />
                  <div className="text-xs text-zinc-500 mt-1">
                    {new Date(r.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VetDashboard;

/* ---------------- SMALL COMPONENTS ---------------- */

const Kpi = ({ label, value, icon, danger, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white dark:bg-zinc-800 border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:shadow-md transition ${
      danger ? "border-red-500" : ""
    }`}
  >
    <div>
      <div className="text-sm text-zinc-500">{label}</div>
      <div
        className={`text-2xl font-semibold ${
          danger ? "text-red-600" : ""
        }`}
      >
        {value}
      </div>
    </div>
    <div className="text-zinc-400">{icon}</div>
  </div>
);

const SeverityBadge = ({ level }) => {
  const styles = {
    HIGH: "bg-red-100 text-red-600",
    MEDIUM: "bg-orange-100 text-orange-600",
    LOW: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded ${
        styles[level] || styles.LOW
      }`}
    >
      {level}
    </span>
  );
};
