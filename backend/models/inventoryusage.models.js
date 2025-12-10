// models/inventoryUsage.model.js

import mongoose from "mongoose";

const inventoryUsageSchema = new mongoose.Schema({

  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
    required: true,
  },

  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "InventoryItem", required: true },
  usedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  quantityUsed: { type: Number, required: true },
  dateTime: { type: Date, default: Date.now },

  notes: { type: String },

}, { timestamps: true });

const InventoryUsage = mongoose.model("InventoryUsage", inventoryUsageSchema);
export default InventoryUsage;
