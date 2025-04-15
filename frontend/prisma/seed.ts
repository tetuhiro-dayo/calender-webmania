import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
    // すでにadminが存在する場合はスキップ
    const existing = await prisma.user.findUnique({
        where: { username: "admin" },
    });

    if (existing) {
        console.log("Admin user already exists.");
        return;
    }

    const password = "password";
    const hashed = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
        data: {
            username: "admin",
            password_hash: hashed,
            is_admin: true,
        },
    });

    console.log(`✅ Admin user created! Username: ${admin.username}`);
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
