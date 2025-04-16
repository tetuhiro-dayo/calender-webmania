// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const secret = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return NextResponse.json({ message: "ユーザー名またはパスワードが間違っています" }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, username: user.username, is_admin: user.is_admin }, secret, {
        expiresIn: "24h",
    });

    return NextResponse.json({ message: "ログイン成功", token });
}
