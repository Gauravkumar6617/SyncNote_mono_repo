import { prisma } from "../config/db";
import { Prisma, ActivityLog } from "@prisma/client";

export class ActivityLogRepository {
  async logAction(data: Prisma.ActivityLogCreateInput): Promise<ActivityLog> {
    return prisma.activityLog.create({ data });
  }

  async findById(id: string): Promise<ActivityLog | null> {
    return prisma.activityLog.findUnique({ where: { id } });
  }

  async findByUserId(userId: string): Promise<ActivityLog[]> {
    return prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}
