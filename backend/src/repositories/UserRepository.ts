import { prisma } from "../config/db";
import { Prisma, User } from "@prisma/client";

// Repository class for User model operations
export class UserRepository {
  /**
   * Create a new user in the database
   * @param data Strictly typed input matching the schema attributes
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  /**
   * Find a user by their unique email address
   * @param email Target user email string
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  /**
   * Find a user by their unique String UUID ID
   * @param id Target user UUID string
   */
  async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  /**
   * Update a user's name by their unique String UUID ID
   * @param id Target user UUID string
   * @param newName New name string to update
   */
  async updateUserName(id: string, newName: string): Promise<User> {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: newName,
      },
    });
  }

  async deleteUser(id: string): Promise<User> {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
