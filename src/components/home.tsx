"use client";

import { useState, useEffect, useMemo } from "react";
import Modal from "./modal";
import type { ArtType } from "@/types";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import UploadArt from "./uploadArt";
import { error } from "@/functions/error";
import Calendar from "./calender";
import { CreateEvent } from "@/lib/api/events";
import { GetArt } from "@/lib/api/art";

const Home = () => {
    const today = useMemo(() => new Date(), []);
    const [currentDate, setCurrentDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState("");
    const [art, setArt] = useState<ArtType | null>(null);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

    const router = useRouter();
    const toLoginPage = () => {
        toast("ログインしてください！");
        router.push("/login");
    };

    // モーダルでイベントを作成
    const handleCreate = async () => {
        if (!selectedDate) return;
        try {
            await CreateEvent({ title: newTitle, date: selectedDate, token: token || "" });
            setNewTitle("");
            setSelectedDate(null);
            router.refresh();
            toast.success("イベントを追加しました！");
        } catch (err) {
            error(err);
        }
    };

    // 月変更処理
    const changeMonth = (increment: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + increment);
            return newDate;
        });
    };

    // 季節のイラスト取得
    useEffect(() => {
        const fetchArt = async () => {
            try {
                const data = await GetArt({
                    year: currentDate.getFullYear(),
                    month: currentDate.getMonth() + 1,
                });
                setArt(data); // ← APIレスポンスに応じて調整
            } catch (err) {
                console.error("イラスト取得に失敗", err);
            }
        };

        fetchArt();
    }, [currentDate]);

    return (
        <div className="calendar-container">
            {art ? (
                <div className="image">
                    <Image
                        src={art.image_url || "/images/noImage.svg"}
                        alt={`${art.month}月のイラスト`}
                        width={400}
                        height={300}
                        className="calendar-image"
                        priority
                    />
                    <p className="image-caption">今月のイラスト: {art.title}</p>
                </div>
            ) : (
                <div className="image-placeholder">イラストを読み込み中...</div>
            )}

            <h1 className="calendar-title">
                {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
            </h1>

            <div className="calendar-nav">
                <button id="prev" onClick={() => changeMonth(-1)}>
                    〈 前月
                </button>
                <button id="next" onClick={() => changeMonth(1)}>
                    次月 〉
                </button>
            </div>

            <Calendar
                date={currentDate}
                token={token}
                onDateClick={date => {
                    if (token) {
                        setSelectedDate(date); // クリックで日付セット
                    } else {
                        toLoginPage();
                    }
                }}
            />
            {selectedDate && token && (
                <Modal
                    title={selectedDate + " にイベント追加"}
                    isOpen={!!selectedDate}
                    onClose={() => setSelectedDate(null)}>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        placeholder="イベントタイトル"
                        className="w-full border px-3 py-2 rounded"
                    />
                    <div className="flex justify-end gap-2">
                        <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded">
                            追加
                        </button>
                        <button onClick={() => setSelectedDate(null)} className="bg-gray-300 px-4 py-2 rounded">
                            キャンセル
                        </button>
                    </div>
                </Modal>
            )}
            {token && <UploadArt token={token} toLoginPage={toLoginPage} art={art} />}
        </div>
    );
};

export default Home;
