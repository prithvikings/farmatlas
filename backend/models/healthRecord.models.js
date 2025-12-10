// models/healthRecord.model.js

import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema({

  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
    required: true,
  },

  animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  date: { type: Date, required: true },

  type: {
    type: String,
    enum: ["VACCINATION", "ILLNESS", "TREATMENT", "CHECKUP"],
    required: true,
  },

  notes: { type: String, required: true },
  medication: { type: String },
  dosage: { type: String },
  nextDueDate: { type: Date },

}, { timestamps: true });

const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);
export default HealthRecord;
