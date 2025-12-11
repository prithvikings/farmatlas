import express from "express"
import { googleAuth, resetPassword, sendOtp, signIn, signOut, signUp, verifyOtp } from "../controllers/auth.controllers.js"
import { validate } from "../middlewares/validate.middleware.js"
import { signUpSchema,signInSchema } from "../validations/auth.validations.js"
const authRouter=express.Router()

authRouter.post("/signup",validate(signUpSchema),signUp)
authRouter.post("/signin",validate(signInSchema),signIn)
authRouter.get("/signout",signOut)
authRouter.post("/send-otp",sendOtp)
authRouter.post("/verify-otp",verifyOtp)
authRouter.post("/reset-password",resetPassword)
authRouter.post("/google-auth",googleAuth)

export default authRouter