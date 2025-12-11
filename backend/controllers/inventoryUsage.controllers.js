//inventoryUsage.controllers.js
import { InventoryUsage, InventoryItem } from "../models/index.js";

export const logInventoryUsage = async (req, res) => {
  try {
    const { itemId, quantityUsed, notes } = req.body;
    const farmId = req.user.farmId;
    const usedBy = req.user.userId;

    if (!itemId || !quantityUsed) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const item = await InventoryItem.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found." });

    if (item.farmId.toString() !== farmId) {
      return res.status(403).json({ message: "Forbidden: Item belongs to another farm." });
    }

    // Update quantity
    item.quantity -= quantityUsed;
    if (item.quantity < 0) item.quantity = 0;
    await item.save();

    const usage = await InventoryUsage.create({
      itemId,
      farmId,
      usedBy,
      quantityUsed,
      notes,
    });

    return res.status(201).json({
      message: "Usage logged.",
      usage,
    });

  } catch (error) {
    return res.status(500).json({ message: "Error logging usage", error: error.message });
  }
};


export const getUsageLogsByItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const farmId = req.user.farmId;

    const item = await InventoryItem.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found." });

    if (item.farmId.toString() !== farmId) {
      return res.status(403).json({ message: "Forbidden: Wrong farm." });
    }

    const logs = await InventoryUsage.find({ itemId, farmId })
      .sort({ createdAt: -1 })
      .populate("usedBy", "name role");

    return res.status(200).json(logs);

  } catch (error) {
    return res.status(500).json({ message: "Error fetching logs", error: error.message });
  }
};


export const getSingleUsageLog = async (req, res) => {
  return res.status(200).json(req.resource);
};


export const deleteUsageLog = async (req, res) => {
  try {
    await InventoryUsage.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Usage log deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting usage log", error: error.message });
  }
};
