// models/healthRecord.model.js

import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema(
  {
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
      index: true,
    },
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
  type: String,
  enum: ["ILLNESS", "VACCINATION", "CHECKUP", "INJURY"],
  required: true,
}
,
    notes: {
      type: String,
      required: true,
    },
    medication: String,
    dosage: String,
    nextDueDate: Date,
  },
  { timestamps: true }
);


const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);
export default HealthRecord;
