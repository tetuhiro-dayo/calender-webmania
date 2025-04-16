// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
    const prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV === "development") {
    (global as any).prisma = prisma;
}

export default prisma;
