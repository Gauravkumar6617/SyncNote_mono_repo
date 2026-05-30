/**
 * Server Entry Point
 * Starts the Express server
 */

import app from "./src/app.js";
import config from "./src/config/environment.js";
import logger from "./src/utils/logger.js";
import {
  connectDatabase,
  disconnectDatabase,
} from "./src/services/database.js";

const PORT = config.PORT;
const HOST = config.HOST;

/**
 * Start Server
 */
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

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
    process.on("SIGTERM", async () => {
      logger.info("SIGTERM received, shutting down gracefully");
      server.close(async () => {
        await disconnectDatabase();
        logger.info("Process terminated");
        process.exit(0);
      });
    });

    // Graceful shutdown on SIGINT (Ctrl+C)
    process.on("SIGINT", async () => {
      logger.info("SIGINT received, shutting down gracefully");
      server.close(async () => {
        await disconnectDatabase();
        logger.info("Process terminated");
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
