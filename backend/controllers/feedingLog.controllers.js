//feedingLog.controllers.js
import { FeedingLog, Animal } from "../models/index.js";

export const createFeedingLog = async (req, res) => {
  try {
    const { animalId, dateTime, foodType, quantity, unit, notes } = req.body;
    const farmId = req.user.farmId;
    const loggedBy = req.user.userId;

    if (!animalId || !dateTime || !foodType || !quantity || !unit) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Ensure animal belongs to this farm
    const animal = await Animal.findOne({ _id: animalId, farmId });
    if (!animal) {
      return res.status(404).json({
        message: "Animal not found in your farm",
      });
    }

    if (animal.farmId.toString() !== farmId) {
      return res
        .status(403)
        .json({ message: "Cannot create feeding log for another farm." });
    }

    const log = await FeedingLog.create({
      farmId,
      animalId,
      loggedBy,
      dateTime,
      foodType,
      quantity,
      unit,
      notes,
    });

    return res.status(201).json({
      message: "Feeding log created successfully",
      log,
    });
  } catch (error) {
    console.error("createFeedingLog error:", error);
    return res
      .status(500)
      .json({ message: "Error creating feeding log.", error: error.message });
  }
};

export const getFeedingLogsByAnimal = async (req, res) => {
  try {
    const { animalId } = req.params;
    const farmId = req.user.farmId;

    const animal = await Animal.findOne({ _id: animalId, farmId });
    if (!animal) {
      return res.status(404).json({
        message: "Animal not found in your farm",
      });
    }

    if (animal.farmId.toString() !== farmId) {
      return res.status(403).json({ message: "Access denied: wrong farm." });
    }

    const logs = await FeedingLog.find({ animalId, farmId })
      .populate("loggedBy", "name role")
      .populate("animalId", "name tagNumber species")
      .sort({ dateTime: -1 });

    return res.status(200).json(logs);
  } catch (error) {
    console.error("getFeedingLogsByAnimal error:", error);
    return res
      .status(500)
      .json({ message: "Error fetching feeding logs.", error: error.message });
  }
};

export const getSingleFeedingLog = async (req, res) => {
  try {
    // Loaded by checkFarmOwnership()
    const log = await FeedingLog.findById(req.resource._id)
      .populate("loggedBy", "name role")
      .populate("animalId", "name tagNumber species");

    return res.status(200).json(log);
  } catch (error) {
    console.error("getSingleFeedingLog error:", error);
    return res
      .status(500)
      .json({ message: "Error fetching log.", error: error.message });
  }
};

export const updateFeedingLog = async (req, res) => {
  try {
    const updates = req.body;

    // prevent cross-farm/animal manipulation
    delete updates.farmId;
    delete updates.animalId;
    delete updates.loggedBy;

    const updated = await FeedingLog.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    return res.status(200).json({
      message: "Feeding log updated successfully",
      updated,
    });
  } catch (error) {
    console.error("updateFeedingLog error:", error);
    return res
      .status(500)
      .json({ message: "Error updating feeding log.", error: error.message });
  }
};

export const deleteFeedingLog = async (req, res) => {
  try {
    await FeedingLog.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ message: "Feeding log deleted successfully" });
  } catch (error) {
    console.error("deleteFeedingLog error:", error);
    return res
      .status(500)
      .json({ message: "Error deleting feeding log.", error: error.message });
  }
};
