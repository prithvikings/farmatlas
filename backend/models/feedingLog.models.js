// models/feedingLog.model.js

import mongoose from "mongoose";

const feedingLogSchema = new mongoose.Schema({

  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
    required: true,
  },

  animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", required: true },
  loggedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  dateTime: { type: Date, required: true },
  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: {
  type: String,
  enum: ["kg", "g", "litre", "unit"],
  required: true,
}
,

  notes: { type: String },

}, { timestamps: true });
feedingLogSchema.index({ farmId: 1, animalId: 1, dateTime: -1 });

const FeedingLog = mongoose.model("FeedingLog", feedingLogSchema);
export default FeedingLog;
