import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTokenPayload } from "@/lib/auth";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = getTokenPayload(token || "");

    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        await prisma.event.delete({
            where: { id: Number(params.id), created_by: user.id },
        });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ message: "削除に失敗しました" }, { status: 500 });
    }
}
