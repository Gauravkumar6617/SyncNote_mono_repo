/**
 * Server Entry Point
 * Starts the Express server
 */

import app from "./src/app.js";
import config from "./src/config/environment.js";
import logger from "./src/utils/logger.js";

const PORT = config.PORT;
const HOST = config.HOST;

const server = app.listen(PORT, HOST, () => {
  logger.info(`
    ================================
    ${config.APP_NAME}
    ================================
    Environment: ${config.NODE_ENV}
    Server running on: http://${HOST}:${PORT}
    API Prefix: ${config.API_PREFIX}
    ================================
  `);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err.message);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  server.close(() => {
    logger.info("Process terminated");
    process.exit(0);
  });
});
