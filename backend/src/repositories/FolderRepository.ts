import { prisma } from "../config/db";
import { Prisma, Folder } from "@prisma/client";

export class FolderRepository {
  async createFolder(data: Prisma.FolderCreateInput): Promise<Folder> {
    return prisma.folder.create({ data });
  }

  async findById(id: string): Promise<Folder | null> {
    return prisma.folder.findUnique({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Folder[]> {
    return prisma.folder.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
  }

  async updateFolder(
    id: string,
    data: Prisma.FolderUpdateInput,
  ): Promise<Folder> {
    return prisma.folder.update({ where: { id }, data });
  }

  async deleteFolder(id: string): Promise<Folder> {
    return prisma.folder.delete({ where: { id } });
  }
}
