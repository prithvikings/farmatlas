import Animal from "../models/animal.models.js";
import HealthRecord from "../models/healthRecord.models.js";
import FinancialTransaction from "../models/financialTransaction.models.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    const { farmId } = req.user;

    // Animals
    const totalAnimals = await Animal.countDocuments({ farmId });
    const activeAnimals = await Animal.countDocuments({
      farmId,
      status: "ACTIVE",
    });

    // Animals with recent health issues
    const animalsWithHealthIssues = await HealthRecord.distinct("animalId", {
      farmId,
    });

    // Financials (current month)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const financials = await FinancialTransaction.aggregate([
      {
        $match: {
          farmId,
          date: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: "$transactionType",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const income =
      financials.find((f) => f._id === "income")?.total || 0;
    const expense =
      financials.find((f) => f._id === "expense")?.total || 0;

    res.json({
      totalAnimals,
      activeAnimals,
      animalsWithHealthIssues: animalsWithHealthIssues.length,
      income,
      expense,
      net: income - expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard stats",
      error: error.message,
    });
  }
};
