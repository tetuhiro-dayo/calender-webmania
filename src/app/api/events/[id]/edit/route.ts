import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTokenPayload } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = getTokenPayload(token || "");

    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, start_date, end_date } = body;

    try {
        const updated = await prisma.event.update({
            where: { id: Number(params.id), created_by: user.id },
            data: { title, start_date: new Date(start_date), end_date: new Date(end_date) },
        });
        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ message: "更新に失敗しました" }, { status: 500 });
    }
}
