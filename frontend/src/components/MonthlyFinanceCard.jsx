const MonthlyFinanceCard = ({ month }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 border rounded-lg p-4 space-y-2">
      <div className="font-medium">
        {month.month}/{month.year}
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-zinc-500">Income</span>
        <span className="text-green-600">₹{month.income}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-zinc-500">Expense</span>
        <span className="text-red-600">₹{month.expense}</span>
      </div>

      <div className="flex justify-between font-medium">
        <span className="text-zinc-500">Net</span>
        <span className={month.net >= 0 ? "text-green-600" : "text-red-600"}>
          ₹{month.net}
        </span>
      </div>
    </div>
  );
};

export default MonthlyFinanceCard;
