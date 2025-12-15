import { useEffect, useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import WorkerLayout from "./WorkerLayout";

const COLORS = ["#22C55E", "#F97316", "#EF4444"];

const WorkerDashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    animalsCount: 0,
    healthAlerts: 0,
    lowStockItems: [],
    recentFeedings: [],
    feedingTrend: [],
    inventorySummary: [],
    tasks: [], // ✅ CRITICAL
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/worker/dashboard")
      .then((res) =>
        setData({
          animalsCount: 0,
          healthAlerts: 0,
          lowStockItems: [],
          recentFeedings: [],
          feedingTrend: [],
          inventorySummary: [],
          tasks: [],
          ...res.data,
        })
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- PRIORITY LOGIC ---------------- */
  const hasUrgentHealth = data.healthAlerts > 0;
  const hasLowStock = data.lowStockItems.length > 0;

  /* ---------------- INVENTORY SUMMARY ---------------- */
  const inventoryBarData = [
    { label: "Low Stock", count: data.lowStockItems.length },
    {
      label: "OK Stock",
      count: Math.max(
        data.animalsCount - data.lowStockItems.length,
        0
      ),
    },
  ];

  // --- START: SKELETON INTEGRATION LOGIC ---
  if (loading) {
    return (
      <WorkerLayout>
        {/* KPI Skeletons */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <KpiSkeleton delay="delay-100" />
          <KpiSkeleton delay="delay-200" />
          <KpiSkeleton delay="delay-300" />
          <KpiSkeleton delay="delay-400" />
        </div>

        {/* TASKS Skeleton (Using ListSkeleton) */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border
        border-zinc-200 dark:border-zinc-700 p-6 mb-6
        transition duration-300 ease-in-out
        shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          <div className="h-4 w-40 mb-4 rounded bg-zinc-300 dark:bg-zinc-700 shimmer delay-500" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-4 rounded bg-zinc-300 dark:bg-zinc-700 shimmer delay-600" />
            ))}
          </div>
        </div>

        {/* CHARTS Skeletons */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <CardSkeleton delay="delay-700" />
          <CardSkeleton delay="delay-800" />
          <CardSkeleton delay="delay-900" />
        </div>

        {/* DETAILS Skeletons (Using ListSkeleton) */}
        <div className="grid grid-cols-2 gap-6">
          <ListSkeleton rows={3} delay="delay-1000" />
          <ListSkeleton rows={3} delay="delay-1100" />
        </div>
      </WorkerLayout>
    );
  }
  // --- END: SKELETON INTEGRATION LOGIC ---


  return (
    <WorkerLayout>
      {/* ---------------- KPI ---------------- */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Kpi label="Total Animals" value={data.animalsCount} />
        <Kpi
          label="Health Alerts"
          value={data.healthAlerts}
          danger={data.healthAlerts > 0}
        />
        <Kpi
          label="Low Stock Items"
          value={data.lowStockItems.length}
          danger={data.lowStockItems.length > 0}
        />
        <Kpi
          label="Today’s Priority"
          value={
            hasUrgentHealth
              ? "Health"
              : hasLowStock
              ? "Inventory"
              : "Normal"
          }
          highlight
        />
      </div>

      {/* ---------------- TASKS ---------------- */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border
      border-zinc-200 dark:border-zinc-700 p-6 mb-6
      transition duration-300 ease-in-out
      shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 font-poppins mb-4">
          Today’s Tasks
        </h3>



        {data.tasks.length === 0 ? (
          <div className="text-sm text-zinc-500">
            No pending tasks 🎉
          </div>
        ) : (
          <div className="space-y-3">
            {data.tasks.map((task, idx) => (
              <div
                key={idx}
                onClick={() => navigate(task.link)}
                className="flex justify-between gap-4 rounded-lg border p-4 cursor-pointer
                hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
>

                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-xs text-zinc-500">
                    {task.description}
                  </div>
                </div>

                <span
                  className={`text-xs font-medium px-2 py-1 rounded-md font-poppins ${
                    task.priority === "HIGH"
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- CHARTS ---------------- */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Feeding Trend */}
        <ClickableCard
          title="Feeding (Last 7 Days)"
          onClick={() => navigate("/worker/feeding")}
          footer="Click to manage feeding"
        >
          {data.feedingTrend.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.feedingTrend}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="quantity"
                  stroke="#22C55E"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ClickableCard>

        {/* Health Status */}
        <ClickableCard
          title="Health Status"
          onClick={() => navigate("/worker/health")}
          footer="Click to view health records"
        >
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={[
                  {
                    label: "Healthy",
                    count: Math.max(
                      data.animalsCount - data.healthAlerts,
                      0
                    ),
                  },
                  {
                    label: "Attention Needed",
                    count: data.healthAlerts,
                  },
                ]}
                dataKey="count"
                nameKey="label"
                outerRadius={80}
              >
                {COLORS.map((c, i) => (
                  <Cell key={i} fill={c} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ClickableCard>

        {/* Inventory Risk */}
        <ClickableCard
          title="Inventory Risk"
          onClick={() => navigate("/worker/inventory")}
          footer="Click to open inventory"
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={inventoryBarData}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </ClickableCard>
      </div>

      {/* ---------------- DETAILS ---------------- */}
      <div className="grid grid-cols-2 gap-6">
        <DetailCard title="Recent Feedings">
          {data.recentFeedings.length === 0 ? (
            <EmptyText text="No feedings logged yet" />
          ) : (
            data.recentFeedings.map((f, i) => (
              <Row
                key={i}
                left={`${f.animalName} — ${f.foodReminder}`}
                right={f.quantity}
              />
            ))
          )}
        </DetailCard>

        <DetailCard title="Low Inventory">
          {data.lowStockItems.length === 0 ? (
            <EmptyText text="All inventory levels healthy" />
          ) : (
            data.lowStockItems.map((i, idx) => (
              <Row
                key={idx}
                left={i.name}
                right={`${i.quantity} ${i.unit}`}
                danger
              />
            ))
          )}
        </DetailCard>
      </div>
    </WorkerLayout>
  );
};

export default WorkerDashboard;

/* ---------------- SMALL COMPONENTS ---------------- */

const Kpi = ({ label, value, danger, highlight }) => (
  <div
    className={`bg-white dark:bg-zinc-800 rounded-lg border
      border-zinc-200 dark:border-zinc-700 p-4 flex flex-col transition
      duration-300 ease-in-out
      shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]`}
  >
    <div className="text-sm text-zinc-600 dark:text-zinc-400 font-poppins">
      {label}
    </div>

    <div
      className={`text-2xl font-semibold mt-2 font-inter ${
        highlight
          ? "text-indigo-600"
          : danger
          ? "text-red-600"
          : "text-zinc-900 dark:text-zinc-100"
      }`}
    >
      {value}
    </div>
  </div>
);


const ClickableCard = ({ title, children, onClick, footer }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-zinc-800 rounded-lg border
      border-zinc-200 dark:border-zinc-700 p-6 cursor-pointer
      transition duration-300 ease-in-out
      shadow-[0_3px_10px_rgb(0,0,0,0.2)]
      hover:border-zinc-300"
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 font-poppins">
        {title}
      </h3>
    </div>

    {children}

    <p className="text-xs text-zinc-500 mt-3 font-poppins">
      {footer} →
    </p>
  </div>
);


const DetailCard = ({ title, children }) => (
  <div
    className="bg-white dark:bg-zinc-800 rounded-lg border
      border-zinc-200 dark:border-zinc-700 p-6
      transition duration-300 ease-in-out
      shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
  >
    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 font-poppins mb-4">
      {title}
    </h3>
    {children}
  </div>
);


const Row = ({ left, right, danger }) => (
  <div className="flex justify-between text-sm py-2 border-t border-zinc-200 dark:border-zinc-800">
    <span className="font-poppins text-zinc-600 dark:text-zinc-300">
      {left}
    </span>
    <span
      className={`font-inter ${
        danger ? "text-red-600 font-medium" : "text-zinc-800 dark:text-zinc-100"
      }`}
    >
      {right}
    </span>
  </div>
);


const EmptyChart = () => (
  <div className="h-[220px] flex items-center justify-center text-sm text-zinc-500">
    No data available
  </div>
);

const EmptyText = ({ text }) => (
  <div className="text-sm text-zinc-500">{text}</div>
);


/* ---------------- SKELETONS ---------------- */

const KpiSkeleton = ({ delay }) => (
  <div className={`bg-white dark:bg-zinc-800 rounded-lg border p-4 shimmer ${delay}`}>
    <div className="h-3 w-32 mb-3 rounded bg-zinc-300 dark:bg-zinc-700" />
    <div className="h-6 w-16 rounded bg-zinc-300 dark:bg-zinc-700" />
  </div>
);

const CardSkeleton = ({ height = 220, delay }) => (
  <div className={`bg-white dark:bg-zinc-800 rounded-lg border p-6 shimmer ${delay}`}>
    <div className="h-4 w-40 mb-4 rounded bg-zinc-300 dark:bg-zinc-700" />
    <div className={`h-[${height}px] rounded bg-zinc-300 dark:bg-zinc-700`} />
  </div>
);

const ListSkeleton = ({ rows = 3, delay }) => (
  <div className={`bg-white dark:bg-zinc-800 rounded-lg border p-6 shimmer ${delay}`}>
    <div className="h-4 w-40 mb-4 rounded bg-zinc-300 dark:bg-zinc-700" />
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 rounded bg-zinc-300 dark:bg-zinc-700" />
      ))}
    </div>
  </div>
);