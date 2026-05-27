/**
 * User Repository
 * Data access layer for User model
 */

import db from "../services/database.js";
import { handlePrismaError, checkUnique } from "../utils/prisma.js";

/**
 * Create a new user
 */
export const createUser = async (data) => {
  try {
    return await db.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        createdAt: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Find user by ID
 */
export const findUserById = async (id) => {
  try {
    return await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        createdAt: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Find user by email
 */
export const findUserByEmail = async (email) => {
  try {
    return await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Get all users
 */
export const getAllUsers = async () => {
  try {
    return await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Update user
 */
export const updateUser = async (id, data) => {
  try {
    return await db.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Delete user
 */
export const deleteUser = async (id) => {
  try {
    return await db.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Check if email exists
 */
export const emailExists = async (email) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return !!user;
  } catch (error) {
    return false;
  }
};
