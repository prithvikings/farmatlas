//routes/animal.routes.js
import express from "express";
import { Animal } from "../models/index.js";
import { isAuth, requireRole, checkFarmOwnership, validate } from "../middlewares/index.js";
import {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} from "../controllers/index.js";
import { createAnimalSchema } from "../validation/index.js";


const Animalrouter = express.Router();

// Admin can create animals
Animalrouter.post(
  "/",
  isAuth,
  requireRole("ADMIN"),
  validate(createAnimalSchema),
  createAnimal
);

// Get all animals for the logged-in user's farm
Animalrouter.get(
  "/",
  isAuth,
  requireRole("ADMIN", "WORKER", "VET"),
  getAnimals
);

// Get single animal by ID (ensure belongs to same farm)
Animalrouter.get(
  "/:id",
  isAuth,
  requireRole("ADMIN", "WORKER", "VET"),
  checkFarmOwnership(Animal),
  getAnimalById
);

// Update animal (Admin only)
Animalrouter.put(
  "/:id",
  isAuth,
  requireRole("ADMIN"),
  checkFarmOwnership(Animal),
  updateAnimal
);

// Delete animal (Admin only)
Animalrouter.delete(
  "/:id",
  isAuth,
  requireRole("ADMIN"),
  checkFarmOwnership(Animal),
  deleteAnimal
);

export default Animalrouter;
