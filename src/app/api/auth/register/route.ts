// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
        return NextResponse.json({ message: "ユーザー名は既に使われています" }, { status: 400 });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { username, password_hash, is_admin: false },
    });

    return NextResponse.json({ message: "ユーザー登録成功", userId: user.id });
}
