import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);

  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation Error",
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Database Validation Error",
      errors: err.errors,
    });
  }

  // Duplicate key error (e.g., email already exists)
  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate Key Error",
      detail: err.keyValue,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired" });
  }

  // Custom thrown errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message || "Error occurred",
    });
  }

  // Fallback (unhandled errors)
  return res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
};
