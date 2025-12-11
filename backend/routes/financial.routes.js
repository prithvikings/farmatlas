// routes/financial.routes.js
import express from "express";
import { isAuth, requireRole, checkFarmOwnership, validate } from "../middlewares/index.js";
import { FinancialTransaction } from "../models/index.js";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummaryForPeriod,
  getMonthlyTotals,
} from "../controllers/index.js";
import { createTransactionSchema } from "../validation/index.js";


const router = express.Router();

// Admin-only: create transaction (income/expense)
router.post(
  "/",
  isAuth,
  requireRole("ADMIN"),
  validate(createTransactionSchema),
  createTransaction
);

// Admin-only: get all transactions with optional filters (date range, type, category, page)
router.get(
  "/",
  isAuth,
  requireRole("ADMIN"),
  getTransactions
);

// Single transaction (admin only) - ensure belongs to farm
router.get(
  "/:id",
  isAuth,
  requireRole("ADMIN"),
  checkFarmOwnership(FinancialTransaction),
  getTransactionById
);

// Update transaction (admin only)
router.put(
  "/:id",
  isAuth,
  requireRole("ADMIN"),
  checkFarmOwnership(FinancialTransaction),
  updateTransaction
);

// Delete transaction (admin only)
router.delete(
  "/:id",
  isAuth,
  requireRole("ADMIN"),
  checkFarmOwnership(FinancialTransaction),
  deleteTransaction
);

// Dashboard summary: totals for a period (start, end) - Admin only
router.get(
  "/summary/period",
  isAuth,
  requireRole("ADMIN"),
  getSummaryForPeriod
);

// Monthly totals for last N months (default 6) - Admin only
router.get(
  "/summary/monthly",
  isAuth,
  requireRole("ADMIN"),
  getMonthlyTotals
);

export default router;
