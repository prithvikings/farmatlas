import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { requireRole } from "../middlewares/requireRole.js";
import { getWorkerDashboard } from "../controllers/worker.controllers.js";

const router = Router();
// routes/worker.routes.js
router.get(
  "/dashboard",
  isAuth,
  requireRole("WORKER"),
  getWorkerDashboard
);

export default router;