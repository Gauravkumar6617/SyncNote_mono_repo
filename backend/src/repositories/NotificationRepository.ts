import { prisma } from "../config/db";
import { Prisma, Notification } from "@prisma/client";

export class NotificationRepository {
  async createNotification(
    data: Prisma.NotificationCreateInput,
  ): Promise<Notification> {
    return prisma.notification.create({ data });
  }

  async findById(id: string): Promise<Notification | null> {
    return prisma.notification.findUnique({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async markRead(id: string): Promise<Notification> {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async deleteNotification(id: string): Promise<Notification> {
    return prisma.notification.delete({ where: { id } });
  }
}
