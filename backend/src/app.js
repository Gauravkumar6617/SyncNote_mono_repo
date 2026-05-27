/**
 * Express Application Setup
 * Main app configuration and middleware setup
 */

import express from "express";
import config from "./config/environment.js";
import corsMiddleware from "./middleware/corsMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";
import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(corsMiddleware);

// Request Logging Middleware
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.path}`);
  next();
});

// Root endpoint - Welcome page
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to SyncNote Backend",
    version: "1.0.0",
    documentation: "https://github.com/Gauravkumar6617/SyncNote_mono_repo",
    availableEndpoints: {
      api: config.API_PREFIX,
      health: `${config.API_PREFIX}/health`,
    },
    environment: config.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use(config.API_PREFIX, routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Route not found",
    path: req.path,
  });
});

// Error Handling Middleware (must be last)
app.use(errorHandler);

export default app;
