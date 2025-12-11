// server.js
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import { ENV } from "./config/env.js";

const PORT = ENV.PORT || 5000;

const startServer = async () => {
  try {
    await Promise.all([
      connectDB(),
      connectRedis()
    ]);

    console.log("✅ Database and Redis connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${ENV.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
