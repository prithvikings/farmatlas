import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const FinanceChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-zinc-500">
        No financial data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickFormatter={(m) => `M${m}`}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#16a34a"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#dc2626"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FinanceChart;
