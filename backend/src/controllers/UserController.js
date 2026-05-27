/**
 * User Controller
 * Business logic for user operations
 */

import * as UserRepo from "../models/User.js";
import { handlePrismaError } from "../utils/prisma.js";
import logger from "../utils/logger.js";

/**
 * Get user by ID
 * GET /api/v1/users/:id
 */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserRepo.findUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    const { statusCode, message } = handlePrismaError(error);
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

/**
 * Get all users
 * GET /api/v1/users
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserRepo.getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
      total: users.length,
    });
  } catch (error) {
    const { statusCode, message } = handlePrismaError(error);
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

/**
 * Create user
 * POST /api/v1/users
 */
export const createUser = async (req, res) => {
  try {
    const { email, password, name, avatar } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if email exists
    const exists = await UserRepo.emailExists(email);
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const user = await UserRepo.createUser({
      email,
      password, // In real app, hash this with bcrypt
      name,
      avatar,
    });

    logger.info(`User created: ${email}`);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    const { statusCode, message } = handlePrismaError(error);
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

/**
 * Update user
 * PATCH /api/v1/users/:id
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, avatar } = req.body;

    const user = await UserRepo.updateUser(id, {
      ...(name && { name }),
      ...(avatar && { avatar }),
    });

    logger.info(`User updated: ${id}`);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    const { statusCode, message } = handlePrismaError(error);
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

/**
 * Delete user
 * DELETE /api/v1/users/:id
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await UserRepo.deleteUser(id);

    logger.info(`User deleted: ${id}`);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    const { statusCode, message } = handlePrismaError(error);
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
