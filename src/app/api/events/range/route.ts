import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const start = searchParams.get("start");
        const end = searchParams.get("end");

        if (!start || !end) {
            return NextResponse.json({ message: "startとendのクエリパラメータが必要です" }, { status: 400 });
        }

        const events = await prisma.event.findMany({
            where: {
                date: {
                    gte: new Date(start),
                    lt: new Date(end),
                },
            },
            orderBy: {
                date: "asc",
            },
        });

        return NextResponse.json(events);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "イベントの取得に失敗しました" }, { status: 500 });
    }
}
