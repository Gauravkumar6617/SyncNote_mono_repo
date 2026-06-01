/**
 * Express Application Setup
 * Main app configuration and middleware setup
 */

import express, { Application, Request, Response, NextFunction } from "express";
import config from "./config/environment";
import corsMiddleware from "./middleware/corsMiddleware";
import errorHandler from "./middleware/errorHandler";
import logger from "./utils/logger";
import routes from "./routes";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";

// Explicitly type the Express application instance
const app: Application = express();

// Core Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(corsMiddleware);
app.use(cookieParser());

// Request Logging Middleware with strict parameter typing
app.use((req: Request, res: Response, next: NextFunction): void => {
  logger.debug(`${req.method} ${req.path}`);
  next();
});

// Root endpoint - Welcome page
app.get("/", (req: Request, res: Response): void => {
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
app.use("/auth", authRoutes);

// 404 Handler for unregistered endpoints
app.use((req: Request, res: Response): void => {
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
