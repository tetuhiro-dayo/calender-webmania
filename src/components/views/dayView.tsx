"use client";

import { useEffect, useState } from "react";
import { FetchEvents } from "@/lib/api/events";
import { EventType } from "@/types";
import toast from "react-hot-toast";
import Link from "next/link";

interface Props {
    date: Date;
    token?: string;
}

const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
};

const DayView = ({ date, token = "" }: Props) => {
    const [events, setEvents] = useState<EventType[]>([]);
    const dateStr = formatDate(date);

    useEffect(() => {
        const fetchDayEvents = async () => {
            try {
                const data = await FetchEvents(dateStr, dateStr, token);
                setEvents(data);
            } catch {
                toast.error("1日のイベント取得に失敗しました");
            }
        };

        fetchDayEvents();
    }, [dateStr, token]);

    return (
        <div className="day-view p-4 border rounded">
            <h2 className="text-lg font-bold mb-2">
                <Link href={"/year/" + date.getFullYear()}>${date.getFullYear()}</Link>
                <Link href={"/month/" + date.getMonth() + 1}>{date.getMonth() + 1}</Link> のイベント
            </h2>
            {events.length > 0 ? (
                <ul className="space-y-2">
                    {events.map(event => (
                        <li key={event.id} className="bg-gray-100 p-2 rounded">
                            {event.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">イベントはありません</p>
            )}
        </div>
    );
};

export default DayView;
