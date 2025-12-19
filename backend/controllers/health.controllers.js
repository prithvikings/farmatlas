// controllers/health.controller.js
import { HealthRecord, Animal } from "../models/index.js";

/**
 * Create a health record.
 * ADMIN or VET only.
 * Validates that the animal belongs to the same farm as the user.
 */
export const addHealthRecord = async (req, res) => {
  try {
    const { animalId, date, type, notes, medication, dosage, nextDueDate } = req.body;
    const farmId = req.user.farmId;
    const createdBy = req.user.userId;

    // Validate required fields
    if (!animalId || !date || !type || !notes) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Ensure animal exists and belongs to this farm
    const animal = await Animal.findById(animalId);
    if (!animal) return res.status(404).json({ message: "Animal not found." });
    if (animal.farmId.toString() !== farmId) {
      return res.status(403).json({ message: "Forbidden: Animal belongs to another farm." });
    }

    const safeDate = date ? new Date(date) : new Date();

    const record = await HealthRecord.create({
      farmId,
      animalId,
      createdBy,
      date: safeDate,
      type,
      notes,
      medication,
      dosage,
      nextDueDate,
    });

    return res.status(201).json({ message: "Health record created.", record });
  } catch (error) {
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: "Server error" });
}

};

/**
 * Get all health records for a specific animal (scoped to farm)
 * ADMIN, VET, WORKER allowed
 */
export const getHealthRecordsByAnimal = async (req, res) => {
  try {
    const farmId = req.user.farmId;
    const { animalId } = req.params;

    // Ensure animal belongs to this farm
    const animal = await Animal.findById(animalId);
    if (!animal) return res.status(404).json({ message: "Animal not found." });
    if (animal.farmId.toString() !== farmId) {
      return res.status(403).json({ message: "Forbidden: Animal belongs to another farm." });
    }

    const records = await HealthRecord.find({ animalId, farmId })
  .populate("createdBy", "name role")
  .populate("animalId", "tagNumber name status")
  .sort({ date: -1, createdAt: -1 });

    return res.status(200).json(records);
  } catch (error) {
    console.error("getHealthRecordsByAnimal error:", error);
    return res.status(500).json({ message: "Error fetching records.", error: error.message });
  }
};

/**
 * Get single health record by id.
 * checkFarmOwnership middleware loads req.resource (the HealthRecord)
 */
export const getHealthRecordById = async (req, res) => {
  try {
    // checkFarmOwnership already attached resource to req.resource
    return res.status(200).json(req.resource);
  } catch (error) {
    console.error("getHealthRecordById error:", error);
    return res.status(500).json({ message: "Error fetching record.", error: error.message });
  }
};

/**
 * Update health record. ADMIN + VET.
 * checkFarmOwnership ensures farmId matches.
 */
export const updateHealthRecord = async (req, res) => {
  try {
    const updates = req.body;
    // Prevent farmId, animalId, createdBy from being changed accidentally
    delete updates.farmId;
    delete updates.animalId;
    delete updates.createdBy;

    const updated = await HealthRecord.findByIdAndUpdate(req.params.id, updates, { new: true });
    return res.status(200).json({ message: "Health record updated.", updated });
  } catch (error) {
    console.error("updateHealthRecord error:", error);
    return res.status(500).json({ message: "Error updating record.", error: error.message });
  }
};

/**
 * Delete health record. ADMIN only.
 * checkFarmOwnership ensures farmId matches.
 */
export const deleteHealthRecord = async (req, res) => {
  try {
    await HealthRecord.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Health record deleted." });
  } catch (error) {
    console.error("deleteHealthRecord error:", error);
    return res.status(500).json({ message: "Error deleting record.", error: error.message });
  }
};

/**
 * Optional: small helper for dashboard — recent animals with health issues.
 * Returns animals with recent 'ILLNESS' or records flagged in last X days.
 */
export const getRecentHealthIssues = async (req, res) => {
  try {
    const farmId = req.user.farmId;
    const days = parseInt(req.query.days || "14", 10);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const issues = await HealthRecord.find({
      farmId,
      type: "ILLNESS",
      date: { $gte: since },
    })
      .sort({ date: -1 })
      .limit(50)
      .populate("animalId", "name tagNumber status");

    return res.status(200).json(issues);
  } catch (error) {
    console.error("getRecentHealthIssues error:", error);
    return res.status(500).json({ message: "Error fetching recent issues.", error: error.message });
  }
};


export const getAllHealthRecordsForFarm = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const records = await HealthRecord.find({ farmId })
      .populate("animalId", "tagNumber name status")
      .populate("createdBy", "name role")
      .sort({ date: -1, createdAt: -1 });

    return res.status(200).json(records);
  } catch (error) {
    console.error("getAllHealthRecordsForFarm error:", error);
    return res.status(500).json({
      message: "Failed to fetch health records",
      error: error.message,
    });
  }
};


export const getHealthIssueSummary = async (req, res) => {
  const farmId = req.user.farmId;
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const count = await HealthRecord.distinct("animalId", {
    farmId,
    type: "ILLNESS",
    date: { $gte: since },
  }).then(arr => arr.length);

  res.json({ count });
};
