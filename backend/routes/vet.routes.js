import express from "express";
import { isAuth, requireRole } from "../middlewares/index.js";
import { getVetDashboard } from "../controllers/vet.controllers.js";

const router = express.Router();

router.get(
  "/dashboard",
  isAuth,
  requireRole("VET"),
  getVetDashboard
);

export default router;
