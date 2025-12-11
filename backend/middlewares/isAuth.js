import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save multi-tenant metadata for every request
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      farmId: decoded.farmId,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
