// backend/models/InventoryItem.models.js

import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["FEED", "MEDICINE", "OTHER"], required: true },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, required: true }, // FIXED
  lowStockThreshold: { type: Number, required: true, min: 0 }
}, { timestamps: true });

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
export default InventoryItem;



