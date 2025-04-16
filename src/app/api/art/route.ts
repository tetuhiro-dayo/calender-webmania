import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const year = Number(searchParams.get("year"));
        const month = Number(searchParams.get("month"));

        if (!year || !month) {
            return NextResponse.json({ message: "yearとmonthを指定してください" }, { status: 400 });
        }

        const arts = await prisma.art.findUnique({
            where: {
                year,
                month,
            },
            orderBy: {
                created_at: "desc",
            },
            include: {
                user: {
                    select: { username: true },
                },
            },
        });

        return NextResponse.json(arts);
    } catch (error) {
        console.error("月ごとのアート取得エラー:", error);
        return NextResponse.json({ message: "サーバーエラー" }, { status: 500 });
    }
}
