import express from "express";
import { isAuth } from "../middlewares/index.js";
import { getMyProfile, updateMyProfile } from "../controllers/index.js";

const profileRouter = express.Router();

profileRouter.get("/me", isAuth, getMyProfile);
profileRouter.put("/me", isAuth, updateMyProfile);

export default profileRouter;