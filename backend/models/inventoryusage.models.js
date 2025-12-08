import mongoose from "mongoose";

const InventoryUsageSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
  usedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantityUsed: { type: Number, required: true },
  dateTime: { type: Date, default: Date.now },
  notes: { type: String }
}, { timestamps: true });


const InventoryUsage = mongoose.model('InventoryUsage', InventoryUsageSchema);
export default InventoryUsage;