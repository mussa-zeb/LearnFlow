
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "node:dns";

import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import seedAdmin from "./utils/seedAdmin.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

const app = express();

const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Basic API health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LearnFlow API is running",
  });
});

// Connect MongoDB before processing API requests
let adminSeedPromise;

app.use("/api", async (req, res, next) => {
  try {
    await connectDB();

    if (!adminSeedPromise) {
      adminSeedPromise = seedAdmin();
    }

    await adminSeedPromise;

    next();
  } catch (error) {
    console.error("API initialization error:", error);

    res.status(503).json({
      success: false,
      message: "Database connection failed. Please try again.",
    });
  }
});

// API routes
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

// Not found
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Server error:", error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    message: "Internal server error",
  });
});

// Local development only
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`LearnFlow server running on port ${PORT}`);
  });
}

// Vercel uses this exported Express application
export default app;
