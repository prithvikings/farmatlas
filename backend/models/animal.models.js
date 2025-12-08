import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  tagNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  gender: { type: String, enum: ["MALE", "FEMALE"], required: true },

  dateOfBirth: { type: Date, required: true },
  acquisitionDate: { type: Date, required: true },

  status: {
    type: String,
    enum: ["ACTIVE", "SOLD", "DEAD", "SICK", "TRANSFERRED", "MISSING"],
    default: "ACTIVE"
  },

  location: { type: String },
  photoUrl: { type: String },
}, { timestamps: true });


const Animal = mongoose.model('Animal', animalSchema);

export default Animal;