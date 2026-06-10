import { prisma } from "../config/db";
import { Prisma, Comment } from "@prisma/client";

export class CommentRepository {
  async createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
    return prisma.comment.create({ data });
  }

  async findById(id: string): Promise<Comment | null> {
    return prisma.comment.findUnique({ where: { id } });
  }

  async findByNoteId(noteId: string): Promise<Comment[]> {
    return prisma.comment.findMany({
      where: { noteId },
      orderBy: { createdAt: "asc" },
    });
  }

  async deleteComment(id: string): Promise<Comment> {
    return prisma.comment.delete({ where: { id } });
  }
}
