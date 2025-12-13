//feedingLog.controllers.js
import { FeedingLog, Animal, InventoryItem } from "../models/index.js";
import mongoose from "mongoose";

export const createFeedingLog = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      animalId,
      dateTime,
      foodType,
      quantity,
      unit,
      notes,
      inventoryItemId,
    } = req.body;

    const normalizedUnit = unit.toLowerCase();

    const farmId = req.user.farmId;
    const loggedBy = req.user.userId;

    if (!animalId || !dateTime || !foodType || !quantity || !unit) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Missing required fields." });
    }

    // 1️⃣ Validate animal
    const animal = await Animal.findById(animalId).session(session);
    if (!animal) throw new Error("Animal not found");

    if (animal.farmId.toString() !== farmId) {
      throw new Error("Forbidden: cross-farm feeding attempt");
    }

    let inventoryItem = null;

    // 2️⃣ Inventory deduction (ONLY if linked)
    if (inventoryItemId) {
      inventoryItem = await InventoryItem.findById(inventoryItemId).session(session);

      if (!inventoryItem) {
        throw new Error("Inventory item not found");
      }

      if (inventoryItem.farmId.toString() !== farmId) {
        throw new Error("Inventory item belongs to another farm");
      }

      if (inventoryItem.quantity < quantity) {
        throw new Error("Insufficient inventory for this feeding");
      }

      inventoryItem.quantity -= quantity;
      await inventoryItem.save({ session });
    }

    // 3️⃣ Create feeding log
    const log = await FeedingLog.create(
      [
        {
          farmId,
          animalId,
          loggedBy,
          dateTime,
          foodType,
          quantity,
          unit: normalizedUnit,
          notes,
          inventoryItemId: inventoryItem?._id,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return res.status(201).json({
      message: "Feeding log created successfully",
      log: log[0],
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("createFeedingLog error:", error.message);

    return res.status(400).json({
      message: error.message || "Failed to create feeding log",
    });
  } finally {
    session.endSession();
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


// controllers/feedingLog.controllers.js

export const getAllFeedingLogsForFarm = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const logs = await FeedingLog.find({ farmId })
      .populate("animalId", "tagNumber name")
      .populate("loggedBy", "name role")
      .sort({ dateTime: -1 });

    res.status(200).json(logs);
  } catch (error) {
    console.error("getAllFeedingLogsForFarm error:", error);
    res.status(500).json({ message: "Failed to fetch feeding logs" });
  }
};
