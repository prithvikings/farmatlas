// controllers/financial.controller.js
import { FinancialTransaction } from "../models/index.js";
import mongoose from "mongoose";


/**
 * Create a transaction (ADMIN only).
 * body: { type: "INCOME" | "EXPENSE", amount, date?, description, category }
 */
export const createTransaction = async (req, res) => {
  try {
    const { type, amount, date, description, category } = req.body;
    const farmId = req.user.farmId;
    const createdBy = req.user.userId;

    if (!type || !amount) {
      return res.status(400).json({ message: "Missing required fields: type and amount." });
    }

    if (!["INCOME", "EXPENSE"].includes(type)) {
      return res.status(400).json({ message: "Invalid type. Must be INCOME or EXPENSE." });
    }

    const txDate = date ? new Date(date) : new Date();
if (txDate < new Date("2015-01-01")) {
  return res.status(400).json({ message: "Date too old" });
}


    const tx = await FinancialTransaction.create({
  farmId,
  type: type.toUpperCase(),        // ✅ normalize
  amount: Number(amount),          // ✅ ensure number
  category: category.toUpperCase(),// ✅ normalize
  date: txDate,
  description,
  createdBy,
});


    return res.status(201).json({ message: "Transaction created.", transaction: tx });
  } catch (error) {
    console.error("createTransaction error:", error);
    return res.status(500).json({ message: "Error creating transaction.", error: error.message });
  }
};

/**
 * Get transactions (paginated + filters)
 * Query params:
 *  - page (default 1), limit (default 25)
 *  - type (INCOME/EXPENSE)
 *  - category
 *  - startDate, endDate (ISO strings)
 */
export const getTransactions = async (req, res) => {
  try {
    const farmId = req.user.farmId;
    const {
      page = 1,
      limit = 25,
      type,
      category,
      startDate,
      endDate,
      sortBy = "date",
      sortDir = "desc",
    } = req.query;

    const q = { farmId };


    if (type) q.type = type.toUpperCase();
    if (category) q.category = category;
    if (startDate || endDate) {
      q.date = {};
      if (startDate) q.date.$gte = new Date(startDate);
      if (endDate) q.date.$lte = new Date(endDate);
    }

    const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      FinancialTransaction.find(q)
        .populate("createdBy", "name role")
        .sort({ [sortBy]: sortDir === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(Number(limit)),
      FinancialTransaction.countDocuments(q),
    ]);

    return res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      total,
      items,
    });
  } catch (error) {
    console.error("getTransactions error:", error);
    return res.status(500).json({ message: "Error fetching transactions.", error: error.message });
  }
};

/**
 * Get single transaction by id (req.resource is loaded by checkFarmOwnership)
 */
export const getTransactionById = async (req, res) => {
  try {
    return res.status(200).json(req.resource);
  } catch (error) {
    console.error("getTransactionById error:", error);
    return res.status(500).json({ message: "Error fetching transaction.", error: error.message });
  }
};

/**
 * Update transaction (ADMIN only) - prevent farmId/createdBy tampering
 */
export const updateTransaction = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.farmId;
    delete updates.createdBy;

    // If type provided, normalize
    if (updates.type) updates.type = updates.type.toUpperCase();

    const updated = await FinancialTransaction.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    return res.status(200).json({ message: "Transaction updated.", transaction: updated });
  } catch (error) {
    console.error("updateTransaction error:", error);
    return res.status(500).json({ message: "Error updating transaction.", error: error.message });
  }
};

/**
 * Delete transaction (ADMIN only)
 */
export const deleteTransaction = async (req, res) => {
  try {
    await FinancialTransaction.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Transaction deleted." });
  } catch (error) {
    console.error("deleteTransaction error:", error);
    return res.status(500).json({ message: "Error deleting transaction.", error: error.message });
  }
};

/**
 * getSummaryForPeriod
 * Query params: startDate, endDate  (ISO). Defaults to last 30 days if not provided.
 * Returns totals: totalIncome, totalExpense, net
 */
export const getSummaryForPeriod = async (req, res) => {
  try {
   const farmId = new mongoose.Types.ObjectId(req.user.farmId);
 // ✅ FIXED
    const { startDate, endDate } = req.query;

    const start = startDate
      ? new Date(startDate)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const end = endDate ? new Date(endDate) : new Date();

    const agg = await FinancialTransaction.aggregate([
      { 
  $match: { 
    farmId,
    date: { 
      $gte: start, 
      $lte: end 
    } 
  } 
}
,
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    agg.forEach((g) => {
      if (g._id === "INCOME") totalIncome = g.total;
      if (g._id === "EXPENSE") totalExpense = g.total;
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      net: totalIncome - totalExpense,
      start,
      end,
    });
  } catch (error) {
    console.error("getSummaryForPeriod error:", error);
    res.status(500).json({ message: "Error fetching summary" });
  }
};


/**
 * getMonthlyTotals
 * Query params: months (number, default 6)
 * Returns: [{ year, month, income, expense, net }]
 */
export const getMonthlyTotals = async (req, res) => {
  try {
    const farmId = new mongoose.Types.ObjectId(req.user.farmId);
 // ✅ FIXED
    const months = Math.max(1, Number(req.query.months || 6));

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const agg = await FinancialTransaction.aggregate([
      {
        $match: {
          farmId,
          date: { $gte: start, $lt: end },
        },
      },
      {
  $project: {
    year: {
      $year: { date: "$date", timezone: "Asia/Kolkata" }
    },
    month: {
      $month: { date: "$date", timezone: "Asia/Kolkata" }
    },
    type: "$type",
    amount: "$amount",
  },
}
,
      {
        $group: {
          _id: { year: "$year", month: "$month", type: "$type" },
          total: { $sum: "$amount" },
        },
      },
    ]);

    const map = {};

    agg.forEach((g) => {
      const key = `${g._id.year}-${g._id.month}`;
      if (!map[key]) {
        map[key] = {
          year: g._id.year,
          month: g._id.month,
          income: 0,
          expense: 0,
        };
      }
      if (g._id.type === "INCOME") map[key].income = g.total;
      if (g._id.type === "EXPENSE") map[key].expense = g.total;
    });

    const results = [];
    for (let i = 0; i < months; i++) {
      const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      const entry =
        map[key] || {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          income: 0,
          expense: 0,
        };

      results.push({
        ...entry,
        net: entry.income - entry.expense,
      });
    }

    res.status(200).json({ months: results });
  } catch (error) {
    console.error("getMonthlyTotals error:", error);
    res.status(500).json({ message: "Error fetching monthly totals" });
  }
};

