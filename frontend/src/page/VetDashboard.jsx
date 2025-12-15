import { useEffect, useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, HeartPulse, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import VetLayout from "./VetLayout";

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

  return (
    <VetLayout>
      {loading ? (
        <>
    {/* KPIs */}
    <div className="grid grid-cols-3 gap-4 mb-6">
      <KpiSkeleton delay="shimmer-delay-1" />
      <KpiSkeleton delay="shimmer-delay-2" />
      <KpiSkeleton delay="shimmer-delay-3" />
    </div>

    {/* Chart */}
    <div className="mb-6">
      <ChartSkeleton delay="shimmer-delay-2" />
    </div>

    {/* Recent Issues */}
    <div className="space-y-3">
      <IssueSkeleton delay="shimmer-delay-1" />
      <IssueSkeleton delay="shimmer-delay-2" />
      <IssueSkeleton delay="shimmer-delay-3" />
    </div>
  </>
      ) : (
        <>
          {/* ---------------- KPIs ---------------- */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Kpi
              label="Animals Needing Attention"
              value={data.healthAlerts}
              icon={<AlertTriangle size={20} />}
              danger={data.healthAlerts > 0}
              onClick={() => navigate("/vet/health")}
            />

            <Kpi
              label="Total Animals"
              value={data.animalsCount}
              icon={<HeartPulse size={20} />}
            />

            <Kpi
              label="Recent Health Reports"
              value={data.recentIssues.length}
              icon={<Activity size={20} />}
            />
          </div>

          {/* ---------------- CHART ---------------- */}
          <div
            onClick={() => navigate("/vet/health")}
            className="bg-white dark:bg-zinc-800 rounded-lg border
              border-zinc-200 dark:border-zinc-700 p-6 mb-6
              cursor-pointer transition
              shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          >
            <h3 className="text-lg font-medium mb-4">
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
                    stroke="#EA580C"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            <p className="text-xs text-zinc-500 mt-3">
              Click to open health records →
            </p>
          </div>

          {/* ---------------- RECENT ISSUES ---------------- */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg border p-6 shadow">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-[#EA580C]" />
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
                    className="border rounded-lg p-4 flex justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <div>
                      <div className="font-medium">
                        {r.animalName} ({r.tagNumber})
                      </div>
                      <div className="text-sm text-zinc-500">
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
      )}
    </VetLayout>
  );
};

export default VetDashboard;



/* ---------------- SMALL COMPONENTS ---------------- */

const Kpi = ({ label, value, icon, danger, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-zinc-800 rounded-lg border
      border-zinc-200 dark:border-zinc-700 p-4
      flex justify-between items-center cursor-pointer
      transition duration-300 ease-in-out
      shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),0px_6px_6px_-3px_rgba(0,0,0,0.06)]
      hover:border-zinc-300"
  >
    <div>
      <div className="text-sm text-zinc-600 dark:text-zinc-400 font-poppins">
        {label}
      </div>
      <div
        className={`text-2xl font-semibold mt-1 font-inter ${
          danger
            ? "text-red-600"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {value}
      </div>
    </div>

    <div className={danger ? "text-red-500" : "text-[#F97316]"}>
      {icon}
    </div>
  </div>
);

const SeverityBadge = ({ level }) => {
  const styles = {
    HIGH: "bg-red-100 text-red-600",
    MEDIUM: "bg-orange-100 text-[#EA580C]",
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


// ---------------- Schimmer skelton ---------------- //

const KpiSkeleton = ({ delay = "" }) => (
  <div
    className={`rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 shimmer ${delay}`}
  >
    <div className="h-3 w-32 rounded mb-3 bg-zinc-300 dark:bg-zinc-700" />
    <div className="h-6 w-16 rounded bg-zinc-300 dark:bg-zinc-700" />
  </div>
);


const ChartSkeleton = ({ delay = "" }) => (
  <div
    className={`rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 shimmer ${delay}`}
  >
    <div className="h-4 w-48 rounded mb-4 bg-zinc-300 dark:bg-zinc-700" />
    <div className="h-[220px] rounded bg-zinc-300 dark:bg-zinc-700" />
  </div>
);

const IssueSkeleton = ({ delay = "" }) => (
  <div
    className={`rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 shimmer ${delay}`}
  >
    <div className="h-4 w-40 rounded mb-2 bg-zinc-300 dark:bg-zinc-700" />
    <div className="h-3 w-60 rounded bg-zinc-300 dark:bg-zinc-700" />
  </div>
);




export { KpiSkeleton, ChartSkeleton, IssueSkeleton };