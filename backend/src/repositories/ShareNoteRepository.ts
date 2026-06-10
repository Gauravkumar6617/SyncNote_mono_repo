import { prisma } from "../config/db";
import { Prisma, ShareNote } from "@prisma/client";

export class ShareNoteRepository {
  async createShare(data: Prisma.ShareNoteCreateInput): Promise<ShareNote> {
    return prisma.shareNote.create({ data });
  }

  async findById(id: string): Promise<ShareNote | null> {
    return prisma.shareNote.findUnique({ where: { id } });
  }

  async findByNoteId(noteId: string): Promise<ShareNote[]> {
    return prisma.shareNote.findMany({ where: { noteId } });
  }

  async findBySharedWithId(userId: string): Promise<ShareNote[]> {
    return prisma.shareNote.findMany({ where: { sharedWithId: userId } });
  }

  async updatePermission(
    id: string,
    data: Prisma.ShareNoteUpdateInput,
  ): Promise<ShareNote> {
    return prisma.shareNote.update({ where: { id }, data });
  }

  async revokeShare(id: string): Promise<ShareNote> {
    return prisma.shareNote.delete({ where: { id } });
  }
}
