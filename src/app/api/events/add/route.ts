import { NextRequest, NextResponse } from "next/server";
import { getTokenPayload } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "認証トークンが必要です" }, { status: 401 });
        }

        const user = getTokenPayload(token);
        if (!user) {
            return NextResponse.json({ message: "無効なトークンです" }, { status: 401 });
        }

        const body = await req.json();
        const { title, start_date, end_date } = body;

        if (!title || !start_date || !end_date) {
            return NextResponse.json({ message: "タイトルと日付が必要です" }, { status: 400 });
        }

        const event = await prisma.event.create({
            data: {
                title,
                start_date: new Date(start_date),
                end_date: new Date(end_date),
                created_by: user.id,
            },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "イベント作成に失敗しました" }, { status: 500 });
    }
}
