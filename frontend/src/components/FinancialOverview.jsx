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
    <>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-medium font-poppins text-zinc-900 dark:text-zinc-100">
          Financial Overview
        </h1>

        <p className="text-md text-zinc-600 dark:text-zinc-400 font-poppins">
          Summary of income and expenses
        </p>

        {summary && (
          <p className="text-xs text-zinc-500 mt-1 font-rubik">
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
      <div className="bg-white dark:bg-zinc-800 border rounded-lg overflow-hidden">
        <div className="p-4 border-b font-medium">Last 6 Months</div>

        <table className="w-full text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-700 font-lato">
            <tr>
              <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                Month
              </th>
              <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                Income
              </th>
              <th className="p-3 text-left text-zinc-800 dark:text-zinc-300">
                Expense
              </th>
              <th className="p-3 text-right text-zinc-800 dark:text-zinc-300">
                Net
              </th>
            </tr>
          </thead>
          <tbody>
            {monthly.map((m, idx) => (
              <tr
                key={idx}
                className="border-t font-poppins font-medium odd:bg-zinc-50 dark:odd:bg-zinc-800 even:bg-zinc-00 dark:even:bg-zinc-900"
              >
                <td className="p-3 text-zinc-900 dark:text-zinc-200">
                  {m.month}/{m.year}
                </td>
                <td className="p-3 text-green-600">₹{m.income}</td>
                <td className="p-3 text-red-600">₹{m.expense}</td>
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
    </>
  );
};

export default FinancialOverview;

/* ---------------------------------- */
/* Small internal component            */
/* ---------------------------------- */
const StatCard = ({ label, value, color }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 flex flex-col transition duration-300 ease-in-out shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
      <div className="text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
      <div className={`text-2xl font-semibold mt-2 font-inter ${color}`}>
        {value}
      </div>
    </div>
  );
};
