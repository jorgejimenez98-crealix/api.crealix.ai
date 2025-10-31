import { PrismaClient } from "@prisma/client"
import { env } from "@/config/env"

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  })

if (env.ENVIROMENT !== "production") globalForPrisma.prisma = prisma
