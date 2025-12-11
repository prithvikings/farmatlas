//animal.controllers.js
import { Animal } from "../models/index.js";


export const createAnimal = async (req, res) => {
  try {
    const {
      tagNumber,
      name,
      species,
      breed,
      gender,
      dateOfBirth,
      acquisitionDate,
      status,
      location,
      photoUrl,
    } = req.body;

    const farmId = req.user.farmId; // critical

    // Check tagNumber conflict inside SAME farm
    const existingAnimal = await Animal.findOne({ tagNumber, farmId });
    if (existingAnimal) {
      return res.status(400).json({
        message: "An animal with this tag number already exists in your farm.",
      });
    }

    const animal = await Animal.create({
      tagNumber,
      name,
      species,
      breed,
      gender,
      dateOfBirth,
      acquisitionDate,
      status,
      location,
      photoUrl,
      farmId,
    });

    return res.status(201).json({
      message: "Animal created successfully",
      animal,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating animal", error });
  }
};


export const getAnimals = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const animals = await Animal.find({ farmId }).sort({ createdAt: -1 });

    return res.status(200).json(animals);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching animals", error });
  }
};


export const getAnimalById = async (req, res) => {
  try {
    // checkFarmOwnership already loaded resource
    return res.status(200).json(req.resource);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching animal", error });
  }
};


export const updateAnimal = async (req, res) => {
  try {
    const updates = req.body;

    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    return res.status(200).json({
      message: "Animal updated successfully",
      updatedAnimal,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating animal", error });
  }
};


export const deleteAnimal = async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Animal deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting animal", error });
  }
};
