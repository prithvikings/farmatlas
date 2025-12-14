import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import AdminLayout from "../layout/AdminLayout";
import { StatCard, LargeCard } from "../components/dashboard/AdminCards";

import FinanceChart from "../components/FinanceChart";
import HealthChart from "../components/HealthChart";

import {
  StatCardSkeleton,
  LargeCardSkeleton,
  ChartSkeleton,
} from "../components/dashboard/AdminSkeletons";

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
        {/* KPI Skeletons */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        {/* Summary Skeletons */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <LargeCardSkeleton key={i} />
          ))}
        </div>

        {/* Chart Skeletons */}
        <div className="grid grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
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
        <StatCard label="Net This Month" value={`₹${stats.finance.net}`} />
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* FINANCE */}
        <LargeCard title="Financial Overview">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-poppins">Income</span>
              <span className="font-medium text-green-600 selection:bg-[#EA580C] selection:text-zinc-100 font-inter">
                ₹{stats.finance.income}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-poppins">Expense</span>
              <span className="font-medium text-red-500 font-inter">
                ₹{stats.finance.expense}
              </span>
            </div>

            <p className="text-xs text-zinc-500 pt-2 font-medium font-poppins">
              {new Date(stats.finance.start).toLocaleDateString()} –{" "}
              {new Date(stats.finance.end).toLocaleDateString()}
            </p>
          </div>
        </LargeCard>

        {/* HEALTH */}
        <LargeCard title="Health Overview">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="font-poppins">Animals with Issues</span>
              <span className="font-semibold text-red-500 font-poppins">
                {stats.animalsWithHealthIssues}
              </span>
            </div>

            {stats.animalsWithHealthIssues > 0 ? (
              <p className="text-xs text-red-500 font-poppins tracking-wide">
                Immediate attention required
              </p>
            ) : (
              <p className="text-xs text-green-600 font-poppins">
                All animals healthy
              </p>
            )}
          </div>
        </LargeCard>

        {/* 👇 NEW WORKER CARD */}
        <LargeCard title="Workforce Overview">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-poppins">Total Workers</span>
              <span className="font-medium">{stats.totalWorkers}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-poppins">Active Workers</span>
              <span className="font-medium text-green-600">
                {stats.activeWorkers}
              </span>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-2 font-poppins">
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
            <p className="text-xs text-zinc-500 mt-2 font-poppins">
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
            <p className="text-xs text-zinc-500 mt-2 font-poppins">
              Click to view animals →
            </p>
          </LargeCard>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
