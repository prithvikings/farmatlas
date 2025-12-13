import express from "express";
import {
  signUp,
  signIn,
  signOut,
  sendOtp,
  verifyOtp,
  resetPassword,
  googleAuth,
} from "../controllers/index.js";

import { validate, isAuth } from "../middlewares/index.js";
import { signUpSchema, signInSchema } from "../validation/index.js";

const authRouter = express.Router();

authRouter.post("/signup", validate(signUpSchema), signUp);
authRouter.post("/signin", validate(signInSchema), signIn);
authRouter.get("/signout", signOut);

authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google-auth", googleAuth);

// 🔥 REQUIRED FOR FRONTEND AUTH CONTEXT
authRouter.get("/me", isAuth, (req, res) => {
  res.json({ user: req.user });
});

export default authRouter;
