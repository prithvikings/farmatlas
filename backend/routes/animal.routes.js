import express from "express";
import Animal from "../models/animal.model.js";
import { isAuth } from "../middleware/isAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { checkFarmOwnership } from "../middleware/checkFarmOwnership.js";
import {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animal.controllers.js";
import { validate } from "../middleware/validate.js";
import { createAnimalSchema } from "../schemas/animal.schemas.js";

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
