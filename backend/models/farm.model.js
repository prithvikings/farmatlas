// models/farm.model.js

import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
  farmName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // ensures uniqueness consistency
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Farm = mongoose.model("Farm", farmSchema);
export default Farm;
