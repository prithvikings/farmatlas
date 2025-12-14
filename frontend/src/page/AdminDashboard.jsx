import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import AdminLayout from "../layout/AdminLayout";
import { StatCard, LargeCard } from "../components/dashboard/AdminCards";

import FinanceChart from "../components/FinanceChart";
import HealthChart from "../components/HealthChart";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [monthlyFinance, setMonthlyFinance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashboardRes, monthlyRes] = await Promise.all([
          api.get("/admin/dashboard"),
          api.get("/financial/summary/monthly?months=6"),
        ]);

        setStats(dashboardRes.data);
        setMonthlyFinance(monthlyRes.data.months || []);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-sm text-zinc-500">Loading dashboard...</div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div className="text-sm text-red-600">
          Failed to load dashboard data.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Animals" value={stats.totalAnimals} />
        <StatCard label="Active Animals" value={stats.activeAnimals} />
        <StatCard
          label="Animals with Health Issues"
          value={stats.animalsWithHealthIssues}
        />
        <StatCard
          label="Net This Month"
          value={`₹${stats.finance.net}`}
        />
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* FINANCE */}
        <LargeCard title="Financial Overview">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Income</span>
              <span className="font-medium text-green-600">
                ₹{stats.finance.income}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Expense</span>
              <span className="font-medium text-red-600">
                ₹{stats.finance.expense}
              </span>
            </div>

            <p className="text-xs text-zinc-500 pt-2">
              {new Date(stats.finance.start).toLocaleDateString()} –{" "}
              {new Date(stats.finance.end).toLocaleDateString()}
            </p>
          </div>
        </LargeCard>

        {/* HEALTH */}
        <LargeCard title="Health Overview">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span>Animals with Issues</span>
              <span className="font-semibold text-red-600">
                {stats.animalsWithHealthIssues}
              </span>
            </div>

            {stats.animalsWithHealthIssues > 0 ? (
              <p className="text-xs text-red-500">
                Immediate attention required
              </p>
            ) : (
              <p className="text-xs text-green-600">
                All animals healthy
              </p>
            )}
          </div>
        </LargeCard>

        {/* 👇 NEW WORKER CARD */}
        <LargeCard title="Workforce Overview">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Workers</span>
              <span className="font-medium">
                {stats.totalWorkers}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Active Workers</span>
              <span className="font-medium text-green-600">
                {stats.activeWorkers}
              </span>
            </div>

            <p className="text-xs text-zinc-500 pt-2">
              Includes workers & vets
            </p>
          </div>
        </LargeCard>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-2 gap-6">
        {/* FINANCE CHART */}
        <div
          onClick={() => navigate("/admin/financials")}
          className="cursor-pointer"
        >
          <LargeCard title="Income vs Expense (Last 6 Months)">
            <FinanceChart data={monthlyFinance} />
            <p className="text-xs text-zinc-500 mt-2">
              Click to view full financials →
            </p>
          </LargeCard>
        </div>

        {/* HEALTH CHART */}
        <div
          onClick={() => navigate("/admin/animals")}
          className="cursor-pointer"
        >
          <LargeCard title="Animal Health Distribution">
            <HealthChart
              total={stats.totalAnimals}
              issues={stats.animalsWithHealthIssues}
            />
            <p className="text-xs text-zinc-500 mt-2">
              Click to view animals →
            </p>
          </LargeCard>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
