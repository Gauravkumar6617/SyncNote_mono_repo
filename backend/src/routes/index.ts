/**
 * Main Routes File
 * Aggregates all route modules
 */

import express from "express";

const router = express.Router();

// Import route modules
// import authRoutes from './authRoutes.js';
// import userRoutes from './userRoutes.js';
// import noteRoutes from './noteRoutes.js';

// Welcome/Info endpoint (Root)
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to SyncNote API",
    version: "1.0.0",
    endpoints: {
      health: "/api/v1/health",
      docs: "/api/v1/docs",
    },
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Mount route modules
// router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
// router.use('/notes', noteRoutes);

export default router;
