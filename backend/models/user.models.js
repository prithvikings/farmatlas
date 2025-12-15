// models/user.model.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    enum: ["ADMIN", "WORKER", "VET"],
    default: "WORKER",
    required: true,
  },

  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
    required: true,
  },

  profile: {
    phone: String,
    address: String,
    city: String,
    state: String,
    country: String,

    experienceYears: Number,        // Vet / Worker
    specialization: String,         // Vet
    assignedSection: String,         // Worker
    emergencyContact: String,

    bio: String,
    avatar: String,                 // URL
  },

}, { timestamps: true });


const User = mongoose.model("User", userSchema);
export default User;
