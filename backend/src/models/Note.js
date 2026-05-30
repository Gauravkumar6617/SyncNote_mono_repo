/**
 * Note Repository
 * Data access layer for Note model
 */

import db from "../services/database.js";
import {
  handlePrismaError,
  getPaginationParams,
  formatPaginatedResponse,
} from "../utils/prisma.js";

/**
 * Create a new note
 */
export const createNote = async (data) => {
  try {
    return await db.note.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Find note by ID
 */
export const findNoteById = async (id) => {
  try {
    return await db.note.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Get all notes for a user
 */
export const getNotesByUserId = async (userId, page = 1, limit = 10) => {
  try {
    const { skip, take } = getPaginationParams(page, limit);

    const [notes, total] = await Promise.all([
      db.note.findMany({
        where: { userId },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      db.note.count({ where: { userId } }),
    ]);

    return formatPaginatedResponse(notes, total, page, limit);
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Get pinned notes for a user
 */
export const getPinnedNotes = async (userId) => {
  try {
    return await db.note.findMany({
      where: { userId, isPinned: true },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Search notes
 */
export const searchNotes = async (userId, query, page = 1, limit = 10) => {
  try {
    const { skip, take } = getPaginationParams(page, limit);

    const [notes, total] = await Promise.all([
      db.note.findMany({
        where: {
          userId,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: { relevance: "desc" },
        skip,
        take,
      }),
      db.note.count({
        where: {
          userId,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        },
      }),
    ]);

    return formatPaginatedResponse(notes, total, page, limit);
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Update note
 */
export const updateNote = async (id, data) => {
  try {
    return await db.note.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Toggle pin status
 */
export const toggleNotePin = async (id, isPinned) => {
  try {
    return await db.note.update({
      where: { id },
      data: { isPinned },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Delete note
 */
export const deleteNote = async (id) => {
  try {
    return await db.note.delete({
      where: { id },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

/**
 * Delete all notes for a user
 */
export const deleteUserNotes = async (userId) => {
  try {
    return await db.note.deleteMany({
      where: { userId },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
