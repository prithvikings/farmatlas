// routes/health.routes.js
import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { checkFarmOwnership } from "../middleware/checkFarmOwnership.js";
import HealthRecord from "../models/healthRecord.model.js";
import {
  addHealthRecord,
  getHealthRecordsByAnimal,
  getHealthRecordById,
  updateHealthRecord,
  deleteHealthRecord,
  getRecentHealthIssues, // optional helper
} from "../controllers/health.controller.js";
import { validate } from "../middleware/validate.js";
import { createHealthRecordSchema } from "../schemas/healthRecord.schemas.js";

const router = express.Router();

// Create health record (ADMIN, VET)
router.post(
  "/",
  isAuth,
  requireRole("ADMIN", "VET"),
  validate(createHealthRecordSchema),
  addHealthRecord
);

// Get all health records for an animal (ADMIN, VET, WORKER)
router.get(
  "/animal/:animalId",
  isAuth,
  requireRole("ADMIN", "VET", "WORKER"),
  getHealthRecordsByAnimal
);

// Get single health record by id (ensures farm ownership)
router.get(
  "/:id",
  isAuth,
  requireRole("ADMIN", "VET", "WORKER"),
  checkFarmOwnership(HealthRecord),
  getHealthRecordById
);

// Update health record (ADMIN, VET)
router.put(
  "/:id",
  isAuth,
  requireRole("ADMIN", "VET"),
  checkFarmOwnership(HealthRecord),
  updateHealthRecord
);

// Delete health record (ADMIN only)
router.delete(
  "/:id",
  isAuth,
  requireRole("ADMIN"),
  checkFarmOwnership(HealthRecord),
  deleteHealthRecord
);

// Optional: get recent issues summary for dashboard
router.get(
  "/recent/issues",
  isAuth,
  requireRole("ADMIN", "VET"),
  getRecentHealthIssues
);

export default router;
