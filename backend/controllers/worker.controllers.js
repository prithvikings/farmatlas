import Animal from "../models/animal.models.js";
import HealthRecord from "../models/healthRecord.models.js";
import FeedingLog from "../models/feedingLog.models.js";
import InventoryItem from "../models/inventoryItem.models.js";
import mongoose from "mongoose";

export const getWorkerDashboard = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    /* ---------------- BASIC COUNTS ---------------- */
    const animalsCount = await Animal.countDocuments({ farmId });

    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const healthIssues = await HealthRecord.find({
      farmId,
      type: "ILLNESS",
      date: { $gte: since },
    })
      .populate("animalId", "name tagNumber")
      .sort({ date: -1 })
      .limit(5);

    const lowStockItems = await InventoryItem.find({
      farmId,
      $expr: { $lte: ["$quantity", "$lowStockThreshold"] },
    }).select("name quantity unit");

    const recentFeedings = await FeedingLog.find({ farmId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("animalId", "name");

    /* ---------------- TASKS (DERIVED) ---------------- */
    const tasks = [];

    // Health tasks
    healthIssues.forEach((h) => {
      tasks.push({
        type: "HEALTH",
        priority: "HIGH",
        title: `Check ${h.animalId?.name || "Animal"}`,
        description: "Recent illness reported",
        link: `/worker/health`,
      });
    });

    // Inventory tasks
    lowStockItems.forEach((i) => {
      tasks.push({
        type: "INVENTORY",
        priority: "MEDIUM",
        title: `Refill ${i.name}`,
        description: `Only ${i.quantity} ${i.unit} left`,
        link: `/worker/inventory`,
      });
    });

    // ---------------- FEEDING TREND (LAST 7 DAYS) ----------------
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

const feedingTrend = await FeedingLog.aggregate([
  {
    $match: {
      farmId: new mongoose.Types.ObjectId(farmId),
      dateTime: { $gte: sevenDaysAgo },
    },
  },
  {
    $group: {
      _id: {
        day: { $dateToString: { format: "%Y-%m-%d", date: "$dateTime" } },
      },
      quantity: { $sum: "$quantity" },
    },
  },
  {
    $sort: { "_id.day": 1 },
  },
]);

// Normalize data for frontend
const feedingTrendFormatted = feedingTrend.map((d) => ({
  date: d._id.day,
  quantity: d.quantity,
}));

    /* ---------------- RESPONSE ---------------- */

    res.status(200).json({
  animalsCount,
  healthAlerts: healthIssues.length,
  lowStockItems,
  recentFeedings: recentFeedings.map(f => ({
    animalName: f.animalId?.name || "Unknown",
    foodReminder: f.foodType,
    quantity: `${f.quantity} ${f.unit}`,
  })),
  feedingTrend: feedingTrendFormatted,
});

  } catch (error) {
    console.error("WORKER DASHBOARD ERROR:", error);
    res.status(500).json({
      message: "Worker dashboard failed",
    });
  }
};
