//routes/user.routes.js
import express from "express";
import { isAuth, requireRole, validate } from "../middlewares/index.js";
import { createUserByAdmin } from "../controllers/index.js";
import { createUserByAdminSchema } from "../validation/index.js";


const router = express.Router();

// Admin can create Worker or Vet
router.post(
  "/create",
  isAuth,
  requireRole("ADMIN"),
  validate(createUserByAdminSchema),
  createUserByAdmin
);

export default router;
