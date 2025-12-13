//inventoryItem.controllers.js
import { InventoryItem } from "../models/index.js";

export const createInventoryItem = async (req, res) => {
  try {
    const { name, category, quantity, unit, lowStockThreshold } = req.body;

    const farmId = req.user.farmId;

    if (!name || !category || quantity == null || !unit || lowStockThreshold == null) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const normalizedCategory = category.toUpperCase();

    const item = await InventoryItem.create({
      name,
      category: normalizedCategory,
      quantity,
      unit,
      lowStockThreshold,
      farmId,
    });

    return res.status(201).json({
      message: "Inventory item created.",
      item,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating item", error: error.message });
  }
};

export const getInventoryItems = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const items = await InventoryItem.find({ farmId })
  .sort({ createdAt: -1 })
  .lean();

const enriched = items.map(item => ({
  ...item,
  isLowStock: item.quantity <= item.lowStockThreshold,
}));

return res.status(200).json(enriched);

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching items", error: error.message });
  }
};

export const getSingleInventoryItem = async (req, res) => {
  try {
    return res.status(200).json(req.resource);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching item", error: error.message });
  }
};

export const updateInventoryItem = async (req, res) => {
  try {
    const updates = req.body;

    delete updates.farmId; // prevent manipulation

    const updated = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    return res.status(200).json({
      message: "Inventory item updated.",
      updated,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating item", error: error.message });
  }
};

export const deleteInventoryItem = async (req, res) => {
  try {
    await InventoryItem.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Inventory item deleted." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting item", error: error.message });
  }
};
