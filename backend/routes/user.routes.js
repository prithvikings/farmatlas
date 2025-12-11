import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { createUserByAdmin } from "../controllers/adminUser.controller.js";
import { validate } from "../middleware/validate.js";
import { createUserByAdminSchema } from "../schemas/user.schemas.js";

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
