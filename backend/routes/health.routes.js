// routes/health.routes.js
import express from "express";
import { isAuth, requireRole, checkFarmOwnership, validate } from "../middlewares/index.js";
import { HealthRecord } from "../models/index.js";
import {
  addHealthRecord,
  getHealthRecordsByAnimal,
  getHealthRecordById,
  updateHealthRecord,
  deleteHealthRecord,
  getRecentHealthIssues,
  getAllHealthRecordsForFarm,
  getHealthIssueSummary
} from "../controllers/index.js";
import { createHealthRecordSchema } from "../validation/index.js";


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


router.get(
  "/",
  isAuth,
  requireRole("ADMIN", "VET"),
  getAllHealthRecordsForFarm
);

router.get(
  "/issues/summary",
  isAuth,
  requireRole("ADMIN", "WORKER", "VET"),
  getHealthIssueSummary
);

export default router;

