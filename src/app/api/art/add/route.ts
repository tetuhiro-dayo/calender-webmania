import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTokenPayload } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "認証トークンが必要です" }, { status: 401 });
        }

        const user = getTokenPayload(token);
        if (!user) {
            return NextResponse.json({ message: "ユーザーが必要です" }, { status: 401 });
        }

        const form = await req.formData();
        const title = form.get("title") as string;
        const file = form.get("file") as File;

        if (!title || !file) {
            return NextResponse.json({ message: "タイトルと画像ファイルが必要です" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadImage(buffer);
        if (!result) {
            return NextResponse.json({ message: "アップロードに失敗しました。" }, { status: 500 });
        }
        const uploadedUrl = result.secure_url;

        const now = new Date();

        const art = await prisma.art.create({
            data: {
                title,
                image_url: uploadedUrl,
                month: now.getMonth() + 1,
                year: now.getFullYear(),
                userId: user.id,
            },
        });

        return NextResponse.json(art, { status: 201 });
    } catch (error) {
        console.error("投稿エラー:", error);
        return NextResponse.json({ message: "サーバーエラー" }, { status: 500 });
    }
}
