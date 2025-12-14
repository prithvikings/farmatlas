import mongoose from "mongoose";
import Animal from "../models/animal.models.js";
import HealthRecord from "../models/healthRecord.models.js";
import FinancialTransaction from "../models/financialTransaction.models.js";
import User from "../models/user.models.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    const farmId = new mongoose.Types.ObjectId(req.user.farmId);

    // ------------------------
    // Animals stats
    // ------------------------
    const [totalAnimals, activeAnimals] = await Promise.all([
      Animal.countDocuments({ farmId }),
      Animal.countDocuments({ farmId, status: "ACTIVE" }),
    ]);

    // ------------------------
    // Health issues (last 90 days, ANY type)
    // ------------------------
    const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

    const animalsWithHealthIssues = await HealthRecord.distinct("animalId", {
      farmId,
      createdAt: { $gte: since }, // 👈 IMPORTANT
    }).then((arr) => arr.length);

    // ------------------------
    // Finance (this month)
    // ------------------------
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = new Date();

    // ------------------------
    // Workers stats
    // ------------------------

    const [totalWorkers, activeWorkers] = await Promise.all([
      User.countDocuments({ farmId, role: { $in: ["WORKER", "VET"] } }),
      User.countDocuments({
        farmId,
        role: { $in: ["WORKER", "VET"] },
        status: "ACTIVE",
      }),
    ]);

    const agg = await FinancialTransaction.aggregate([
      {
        $match: {
          farmId,
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let income = 0;
    let expense = 0;

    agg.forEach((g) => {
      if (g._id === "INCOME") income = g.total;
      if (g._id === "EXPENSE") expense = g.total;
    });

    // ------------------------
    // RESPONSE (single, stable contract)
    // ------------------------
    res.status(200).json({
      totalAnimals,
      activeAnimals,
      animalsWithHealthIssues,
      totalWorkers,
      activeWorkers,
      finance: {
        income,
        expense,
        net: income - expense,
        start,
        end,
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({
      message: "Failed to load dashboard stats",
      error: error.message,
    });
  }
};
