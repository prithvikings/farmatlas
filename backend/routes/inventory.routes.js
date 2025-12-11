//routes/inventory.routes.js
import express from "express";
import { isAuth, requireRole, checkFarmOwnership, validate } from "../middlewares/index.js";
import { InventoryItem, InventoryUsage } from "../models/index.js";

import {
  createInventoryItem,
  getInventoryItems,
  getSingleInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../controllers/index.js";

import {
  logInventoryUsage,
  getUsageLogsByItem,
  deleteUsageLog,
  getSingleUsageLog,
} from "../controllers/index.js";

import {
  createInventoryItemSchema,
  createInventoryUsageSchema,
} from "../validation/index.js";


const router = express.Router();

//
// INVENTORY ITEMS
//

// Admin creates items
router.post(
  "/item",
  isAuth,
  requireRole("ADMIN"),
  validate(createInventoryItemSchema),
  createInventoryItem
);

// Get all inventory items (Admin, Worker, Vet)
router.get(
  "/item",
  isAuth,
  requireRole("ADMIN", "WORKER", "VET"),
  getInventoryItems
);

// Get single item
router.get(
  "/item/:id",
  isAuth,
  requireRole("ADMIN", "WORKER", "VET"),
  checkFarmOwnership(InventoryItem),
  getSingleInventoryItem
);

// Update item (Admin only)
router.put(
  "/item/:id",
  isAuth,
  requireRole("ADMIN"),
  checkFarmOwnership(InventoryItem),
  updateInventoryItem
);

// Delete item (Admin only)
router.delete(
  "/item/:id",
  isAuth,
  requireRole("ADMIN"),
  checkFarmOwnership(InventoryItem),
  deleteInventoryItem
);

//
// INVENTORY USAGE
//

// Log usage (Admin, Worker, Vet)
router.post(
  "/usage",
  isAuth,
  requireRole("ADMIN", "WORKER", "VET"),
  validate(createInventoryUsageSchema),
  logInventoryUsage
);

// Get usage logs for a specific item
router.get(
  "/usage/:itemId",
  isAuth,
  requireRole("ADMIN", "WORKER", "VET"),
  getUsageLogsByItem
);

// Get single usage log (tenant verified)
router.get(
  "/usage/log/:id",
  isAuth,
  requireRole("ADMIN", "WORKER", "VET"),
  checkFarmOwnership(InventoryUsage),
  getSingleUsageLog
);

// Delete usage log (ADMIN only)
router.delete(
  "/usage/log/:id",
  isAuth,
  requireRole("ADMIN"),
  checkFarmOwnership(InventoryUsage),
  deleteUsageLog
);

export default router;
