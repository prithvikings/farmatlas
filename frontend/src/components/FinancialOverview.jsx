import { useEffect, useState } from "react";
import api from "../lib/axios";
import AdminLayout from "../layout/AdminLayout";

const FinancialOverview = () => {
  const [summary, setSummary] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [summaryRes, monthlyRes] = await Promise.all([
        api.get("/financial/summary/period"),
        api.get("/financial/summary/monthly?months=6"),
      ]);

      setSummary(summaryRes.data);
      setMonthly(monthlyRes.data.months);
    } catch (err) {
      console.error("Failed to load financial overview", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-sm text-zinc-500">Loading financial overview…</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-6">
  <h1 className="text-xl font-semibold">Financial Overview</h1>

  <p className="text-sm text-zinc-500">
    Summary of income and expenses
  </p>

  {summary && (
    <p className="text-xs text-zinc-500 mt-1">
      {new Date(summary.start).toLocaleDateString()} –{" "}
      {new Date(summary.end).toLocaleDateString()}
    </p>
  )}
</div>


      {/* KPI CARDS */}
      {summary && (
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Total Income"
          value={`₹${summary.totalIncome}`}
          color="text-green-600"
        />
        <StatCard
          label="Total Expense"
          value={`₹${summary.totalExpense}`}
          color="text-red-600"
        />
        <StatCard
          label="Net"
          value={`₹${summary.net}`}
          color={summary.net >= 0 ? "text-green-600" : "text-red-600"}
        />
      </div>
      )}

      {/* MONTHLY TABLE (simple + clear for now) */}
      <div className="bg-white dark:bg-zinc-800 border rounded-lg">
        <div className="p-4 border-b font-medium">Last 6 Months</div>

        <table className="w-full text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-700">
            <tr>
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-right">Income</th>
              <th className="p-3 text-right">Expense</th>
              <th className="p-3 text-right">Net</th>
            </tr>
          </thead>
          <tbody>
            {monthly.map((m, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3">
                  {m.month}/{m.year}
                </td>
                <td className="p-3 text-right text-green-600">
                  ₹{m.income}
                </td>
                <td className="p-3 text-right text-red-600">
                  ₹{m.expense}
                </td>
                <td
                  className={`p-3 text-right font-medium ${
                    m.net >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹{m.net}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default FinancialOverview;

/* ---------------------------------- */
/* Small internal component            */
/* ---------------------------------- */
const StatCard = ({ label, value, color }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4">
      <div className="text-sm text-zinc-500">{label}</div>
      <div className={`text-xl font-semibold mt-1 ${color}`}>
        {value}
      </div>
    </div>
  );
};
