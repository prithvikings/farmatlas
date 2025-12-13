//animal.controllers.js
import { Animal } from "../models/index.js";


export const createAnimal = async (req, res) => {
  try {
    const { tagNumber, name, species, gender } = req.body;
    const farmId = req.user.farmId;

    if (!tagNumber || !name || !species || !gender) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const animal = await Animal.create({
      tagNumber,
      name,
      species,
      gender,
      farmId,
    });

    return res.status(201).json({
      message: "Animal created successfully",
      animal,
    });
  }catch (error) {
  console.error("CREATE ANIMAL ERROR:", error);

  if (error.code === 11000) {
    return res.status(400).json({
      message: "Animal tag already exists in this farm",
    });
  }

  return res.status(500).json({
    message: "Failed to create animal",
    error: error.message,
  });
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

    const updatedAnimal = await Animal.findOneAndUpdate(
      { _id: req.params.id, farmId: req.user.farmId },
      updates,
      { new: true }
    );

    return res.status(200).json({
      message: "Animal updated successfully",
      updatedAnimal,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating animal",
    });
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
