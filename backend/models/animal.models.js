import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
      index: true,
    },

    tagNumber: {
      type: String,
      required: true,
      trim: true,
    },

    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    gender: { type: String, enum: ["MALE", "FEMALE"], required: true },

    dateOfBirth: { type: Date },
acquisitionDate: { type: Date },

    status: {
      type: String,
      enum: ["ACTIVE", "SOLD", "DEAD", "SICK", "TRANSFERRED", "MISSING"],
      default: "ACTIVE",
    },

    location: { type: String },
    photoUrl: { type: String },
  },
  { timestamps: true }
);

// 🔥 UNIQUE PER FARM
animalSchema.index(
  { farmId: 1, tagNumber: 1 },
  { unique: true }
);

const Animal = mongoose.model("Animal", animalSchema);
export default Animal;
