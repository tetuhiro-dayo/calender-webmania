"use client";

import { useEffect, useMemo, useState } from "react";
import Modal from "./modal";
import { createEvent, fetchEvents } from "@/lib/api";
import type { EventType } from "@/types";
import { getArt } from "@/arts";
import Image from "next/image";
import { generateCalendar } from "@/functions/generateCalender";

const Calender = () => {
    const today = useMemo(() => new Date(), []);
    const [currentDate, setCurrentDate] = useState(today);
    const [events, setEvents] = useState<EventType[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState("");
    const [refresh, setRefresh] = useState(false); // イベント再取得用
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

    // モーダルでイベントを作成
    const handleCreate = async () => {
        if (!selectedDate) return;
        try {
            await createEvent({ title: newTitle, date: selectedDate, token: token || "" });
            setNewTitle("");
            setSelectedDate(null);
            setRefresh(prev => !prev); // useEffectトリガー用
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            alert(err.message);
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

    useEffect(() => {
        const fetchAndSetEvents = async () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const start = new Date(year, month, 1).toISOString().split("T")[0];
            const end = new Date(year, month + 1, 0).toISOString().split("T")[0];

            try {
                const data = await fetchEvents(start, end, token || "");
                setEvents(data);
            } catch (err) {
                console.error("イベントの取得に失敗しました", err);
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
                    <tbody>
                        {generateCalendar(
                            currentDate.getFullYear(),
                            currentDate.getMonth() + 1,
                            events,
                            date => setSelectedDate(date), // クリックで日付セット
                        )}
                    </tbody>
                </table>
            </div>
            {selectedDate && (
                <Modal
                    title={selectedDate + " にイベント追加"}
                    isOpen={!!selectedDate}
                    onClose={() => setSelectedDate("")}>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        placeholder="イベントタイトル"
                    />
                    <button onClick={handleCreate}>追加</button>
                    <button onClick={() => setSelectedDate(null)}>キャンセル</button>
                </Modal>
            )}

            <div className="art-upload">
                <h3>今月のテーマ: 「{seasonalArt.month}月のサーバー室」</h3>
                <button className="upload-button">イラストを投稿</button>
            </div>
        </div>
    );
};

export default Calender;
