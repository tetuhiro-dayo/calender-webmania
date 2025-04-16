"use client";

import { useState, useEffect, useMemo } from "react";
import Modal from "./modal";
import { CreateEvent, FetchEvents, CreateArt } from "@/lib/api";
import type { EventType } from "@/types";
import { getArt } from "@/arts";
import Image from "next/image";
import { useCalendar } from "@/hooks/useCalender";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const error = (err: unknown) => {
    const message = err instanceof Error ? err.message : String(err);
    toast.error(message);
    console.error(message);
};

const Calender = () => {
    const today = useMemo(() => new Date(), []);
    const [currentDate, setCurrentDate] = useState(today);
    const [events, setEvents] = useState<EventType[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState("");
    const [refresh, setRefresh] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
    const [uploadOpen, setUploadOpen] = useState(false);
    const [artTitle, setArtTitle] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const router = useRouter();
    const toLoginPage = () => {
        toast("ログインしてください！");
        router.push("/login");
    };
    const c = useCalendar(currentDate, events, date => {
        if (token) {
            setSelectedDate(date); // クリックで日付セット
        } else {
            toLoginPage();
        }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const calender = useMemo(() => c, [currentDate, events, c]);

    // モーダルでイベントを作成
    const handleCreate = async () => {
        if (!selectedDate) return;
        try {
            await CreateEvent({ title: newTitle, date: selectedDate, token: token || "" });
            setNewTitle("");
            setSelectedDate(null);
            setRefresh(prev => !prev); // useEffectトリガー用
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

    useEffect(() => {
        const fetchAndSetEvents = async () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const start = new Date(year, month, 1).toISOString().split("T")[0];
            const end = new Date(year, month + 1, 0).toISOString().split("T")[0];

            try {
                const data = await FetchEvents(start, end, token || "");
                setEvents(data);
            } catch (err) {
                error("イベントの取得に失敗しました: " + err);
            }
        };

        if (token) {
            fetchAndSetEvents();
        }
    }, [currentDate, token, refresh]);

    // 季節のイラスト取得
    const seasonalArt = getArt(currentDate.getFullYear(), currentDate.getMonth() + 1);

    return (
        <div className="calendar-container">
            <div className="image">
                <Image
                    src={seasonalArt.url}
                    alt={`${seasonalArt.month}月のイラスト`}
                    width={400}
                    height={300}
                    className="calendar-image"
                    priority
                />
                <p className="image-caption">今月のイラスト: {seasonalArt.author}</p>
            </div>

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

            <div id="table" className="calendar-table">
                <table>
                    <thead>
                        <tr>
                            {["日", "月", "火", "水", "木", "金", "土"].map(day => (
                                <th key={day}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{calender}</tbody>
                </table>
            </div>
            {selectedDate && (
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
            <div className="art-upload">
                <h3>今月のテーマ: 「{seasonalArt.month}月のサーバー室」</h3>
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
        </div>
    );
};

export default Calender;
