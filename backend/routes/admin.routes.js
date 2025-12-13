import express from "express";
import { isAuth, requireRole } from "../middlewares/index.js";
import { getAdminDashboardStats } from "../controllers/adminDashboard.controllers.js";

const router = express.Router();

router.get(
  "/dashboard",
  isAuth,
  requireRole("ADMIN"),
  getAdminDashboardStats
);


export default router;
