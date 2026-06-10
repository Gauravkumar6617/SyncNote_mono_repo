import { prisma } from "../config/db";
import { Prisma, NoteVersion } from "@prisma/client";

export class NoteVersionRepository {
  async createVersion(
    data: Prisma.NoteVersionCreateInput,
  ): Promise<NoteVersion> {
    return prisma.noteVersion.create({ data });
  }

  async findById(id: string): Promise<NoteVersion | null> {
    return prisma.noteVersion.findUnique({ where: { id } });
  }

  async findByNoteId(noteId: string): Promise<NoteVersion[]> {
    return prisma.noteVersion.findMany({
      where: { noteId },
      orderBy: { createdAt: "desc" },
    });
  }

  async deleteVersion(id: string): Promise<NoteVersion> {
    return prisma.noteVersion.delete({ where: { id } });
  }
}
