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

  if (loading) {
    return (
      <div className="text-sm text-zinc-500">
        Loading dashboard…
      </div>
    );
  }

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

  return (
    <>
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
      <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4 mb-6">
        <h3 className="font-medium mb-3">Today’s Tasks</h3>

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
                className="flex justify-between items-start border rounded p-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
              >
                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-xs text-zinc-500">
                    {task.description}
                  </div>
                </div>

                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
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
    </>
  );
};

export default WorkerDashboard;

/* ---------------- SMALL COMPONENTS ---------------- */

const Kpi = ({ label, value, danger, highlight }) => (
  <div
    className={`bg-white dark:bg-zinc-800 border rounded-lg p-4 ${
      danger ? "border-red-500" : ""
    }`}
  >
    <div className="text-sm text-zinc-500">{label}</div>
    <div
      className={`text-2xl font-semibold ${
        highlight ? "text-indigo-600" : danger ? "text-red-600" : ""
      }`}
    >
      {value}
    </div>
  </div>
);

const ClickableCard = ({ title, children, onClick, footer }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-zinc-800 border rounded-lg p-4 cursor-pointer hover:shadow-md transition"
  >
    <h3 className="font-medium mb-3">{title}</h3>
    {children}
    <p className="text-xs text-zinc-400 mt-2">{footer}</p>
  </div>
);

const DetailCard = ({ title, children }) => (
  <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4">
    <h3 className="font-medium mb-3">{title}</h3>
    {children}
  </div>
);

const Row = ({ left, right, danger }) => (
  <div className="flex justify-between text-sm border-t py-2">
    <span>{left}</span>
    <span className={danger ? "text-red-600 font-medium" : ""}>
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
