"use client";

import { useState } from "react";
import Modal from "./modal";
import toast from "react-hot-toast";
import { CreateArt } from "@/lib/api";
import { error } from "@/functions/error";
import type { ArtType } from "@/types";

interface Props {
    token: string;
    toLoginPage: () => void;
    art: ArtType | null;
}

const UploadArt = ({ token, toLoginPage, art }: Props) => {
    const [uploadOpen, setUploadOpen] = useState(false);
    const [artTitle, setArtTitle] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSubmitArt = async () => {
        if (!artTitle || !imageFile) {
            toast.error("タイトルと画像ファイルの両方を入力してください");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("title", artTitle);
            formData.append("file", imageFile);
            // CreateArt API関数でイラスト投稿を処理
            await CreateArt(formData, token || "");
            toast.success("イラストを投稿しました！");
            setArtTitle("");
            setImageFile(null);
            setUploadOpen(false);
        } catch (err) {
            error(err);
        }
    };

    return (
        <div className="art-upload">
            {art && <h3>テーマ：{art.month}月</h3>}
            <button
                onClick={() => {
                    if (token) {
                        setUploadOpen(true);
                    } else {
                        toLoginPage();
                    }
                }}
                className="upload-button">
                イラストを投稿
            </button>
            <Modal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} title="イラストを投稿">
                <input
                    type="text"
                    placeholder="タイトル"
                    value={artTitle}
                    onChange={e => setArtTitle(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                            setImageFile(e.target.files[0]);
                        }
                    }}
                    className="w-full border px-3 py-2 rounded"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={handleSubmitArt} className="bg-green-500 text-white px-4 py-2 rounded">
                        送信
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default UploadArt;
