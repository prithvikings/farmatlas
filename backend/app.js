// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.js";

// Import middlewares
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Load barrel routes
import {
  authRoutes,
  animalRoutes,
  feedingLogRoutes,
  financialRoutes,
  healthRoutes,
  inventoryRoutes,
  userRoutes,
  adminRoutes,
  workerRoutes,
  vetRoutes,
  profile
} from "./routes/index.js";

const app = express();

// ----------------------
// Global Middleware
// ----------------------
app.use(requestLogger); // log all requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(cors({
  origin: ENV.FRONTEND_URL,
  credentials: true,
}));

// ----------------------
// API Routes
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/feeding", feedingLogRoutes);
app.use("/api/financial", financialRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/vet", vetRoutes);
app.use("/api/profile", profile);



// ----------------------
// Health Check Endpoint
// ----------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: Date.now() });
});

// ----------------------
// Global 404 Handler
// ----------------------
app.use((req, res) => {
  return res.status(404).json({ message: "Route not found" });
});

// GLOBAL ERROR HANDLER (must be last middleware)
app.use(errorHandler);

export default app;
