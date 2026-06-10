import { prisma } from "../config/db";
import { Prisma, Note } from "@prisma/client";

export class NoteRepository {
  async createNote(data: Prisma.NoteCreateInput): Promise<Note> {
    return prisma.note.create({ data });
  }

  async findById(id: string): Promise<Note | null> {
    return prisma.note.findUnique({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Note[]> {
    return prisma.note.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
  }

  async updateNote(id: string, data: Prisma.NoteUpdateInput): Promise<Note> {
    return prisma.note.update({ where: { id }, data });
  }

  async deleteNote(id: string): Promise<Note> {
    return prisma.note.delete({ where: { id } });
  }
}
