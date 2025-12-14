// controllers/vet.controller.js
import HealthRecord from "../models/healthRecord.models.js";
import Animal from "../models/animal.models.js";
import mongoose from "mongoose";

export const getVetDashboard = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const since = new Date();
    since.setDate(since.getDate() - 30);

    /* ---------------- TOTAL ANIMALS ---------------- */
    const animalsCount = await Animal.countDocuments({ farmId });

    /* ---------------- RECENT ILLNESS ISSUES ---------------- */
    const recentIssues = await HealthRecord.find({
      farmId,
      type: { $regex: /illness/i }, // 🔥 FIX
    })
      .populate("animalId", "name tagNumber")
      .sort({ date: -1 })
      .limit(5);

    /* ---------------- DISTINCT ANIMALS WITH ISSUES ---------------- */
    const animalsWithIssues = await HealthRecord.distinct(
      "animalId",
      {
        farmId,
        type: { $regex: /illness/i }, // 🔥 FIX
      }
    );

    /* ---------------- HEALTH TREND (LAST 14 DAYS) ---------------- */
    const trendSince = new Date();
    trendSince.setDate(trendSince.getDate() - 14);

    const healthTrend = await HealthRecord.aggregate([
      {
        $match: {
          farmId: new mongoose.Types.ObjectId(farmId),
          type: { $regex: /illness/i }, // 🔥 FIX
          date: { $gte: trendSince },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
        },
      },
    ]);

    /* ---------------- RESPONSE ---------------- */
    res.status(200).json({
      animalsCount,
      healthAlerts: animalsWithIssues.length,
      recentIssues: recentIssues.map((r) => ({
        animalId: r.animalId?._id,
        animalName: r.animalId?.name || "Unknown",
        tagNumber: r.animalId?.tagNumber || "—",
        issue: r.notes || "Health issue reported",
        date: r.date,
      })),
      healthTrend,
    });
  } catch (error) {
    console.error("Vet dashboard error:", error);
    res.status(500).json({
      message: "Failed to load vet dashboard",
      error: error.message,
    });
  }
};
