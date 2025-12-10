// middleware/isAuth.js

import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const isAuth = (req, res, next) => {
  try {
    // Token from cookie or Authorization header
    const token =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    // Validate required fields for multi-farm
    if (!decoded.userId || !decoded.role || !decoded.farmId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token payload" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
