import { prisma } from "@/db/prisma"

export class UserService {
  static async list() {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isAdmin: true,
        isCustomer: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return users
  }
}
