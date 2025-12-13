import { useEffect, useState } from "react";
import api from "../lib/axios";
import AdminLayout from "../layout/AdminLayout";
import { StatCard, LargeCard } from "../components/dashboard/AdminCards";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-sm text-zinc-500">Loading dashboard...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Animals" value={stats.totalAnimals} />
        <StatCard label="Active Animals" value={stats.activeAnimals} />
        <StatCard
          label="Animals with Health Issues"
          value={stats.animalsWithHealthIssues}
        />
        <StatCard
          label="Net This Month"
          value={`₹${stats.net}`}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <LargeCard title="Financial Overview">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Income</span>
              <span className="font-medium text-green-600">
                ₹{stats.income}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Expense</span>
              <span className="font-medium text-red-600">
                ₹{stats.expense}
              </span>
            </div>
          </div>
        </LargeCard>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
