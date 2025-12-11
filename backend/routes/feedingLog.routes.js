//feedingLog.routes.js
import express from "express";
import { FeedingLog, Animal } from "../models/index.js";
import { isAuth, requireRole, checkFarmOwnership, validate } from "../middlewares/index.js";
import {
  createFeedingLog,
  getFeedingLogsByAnimal,
  getSingleFeedingLog,
  deleteFeedingLog,
  updateFeedingLog
} from "../controllers/index.js";
import { createFeedingLogSchema } from "../validation/index.js";


const router = express.Router();

// Workers + Admin can create feeding logs
router.post(
  "/",
  isAuth,
  requireRole("ADMIN", "WORKER"),
  validate(createFeedingLogSchema),
  createFeedingLog
);

// Get feeding logs for specific animal
router.get(
  "/animal/:animalId",
  isAuth,
  requireRole("ADMIN", "WORKER", "VET"),
  getFeedingLogsByAnimal
);

// Get single feeding log by id (any role can view if belongs to farm)
router.get(
  "/:id",
  isAuth,
  requireRole("ADMIN", "WORKER", "VET"),
  checkFarmOwnership(FeedingLog),
  getSingleFeedingLog
);

// Update feeding log (ADMIN only)
router.put(
  "/:id",
  isAuth,
  requireRole("ADMIN"),
  checkFarmOwnership(FeedingLog),
  updateFeedingLog
);

// Delete feeding log (ADMIN only)
router.delete(
  "/:id",
  isAuth,
  requireRole("ADMIN"),
  checkFarmOwnership(FeedingLog),
  deleteFeedingLog
);

export default router;
