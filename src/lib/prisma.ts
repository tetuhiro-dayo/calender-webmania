import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
    const prisma: PrismaClient | undefined;
}
const globalForPrisma = global as unknown as { prisma: PrismaClient };
globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());
const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV === "development") {
    (global as any).prisma = prisma;
}

export default prisma;
