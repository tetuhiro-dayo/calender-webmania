import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTokenPayload } from "@/lib/auth";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = getTokenPayload(token || "");
    const { id } = await context.params;

    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, date } = body;

    try {
        const updated = await prisma.event.update({
            where: { id: Number(id), created_by: user.id },
            data: { title, date: new Date(date) },
        });
        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ message: "更新に失敗しました" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = getTokenPayload(token || "");
    const { id } = await context.params;

    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        await prisma.event.delete({
            where: { id: Number(id), created_by: user.id },
        });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ message: "削除に失敗しました" }, { status: 500 });
    }
}
