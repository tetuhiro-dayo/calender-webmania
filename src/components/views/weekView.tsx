"use client";

import { useEffect, useState } from "react";
import { FetchEvents } from "@/lib/api/events";
import { EventType } from "@/types";
import toast from "react-hot-toast";

interface Props {
    date: Date;
    token?: string;
}

const getWeekStart = (date: Date) => {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay()); // Sunday
    d.setHours(0, 0, 0, 0);
    return d;
};

const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

const WeekView = ({ date, token = "" }: Props) => {
    const weekStart = getWeekStart(date);
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        const fetchWeekEvents = async () => {
            const start = weekStart.toISOString().split("T")[0];
            const end = addDays(weekStart, 7).toISOString().split("T")[0];

            try {
                const data = await FetchEvents(start, end, token);
                setEvents(data);
            } catch {
                toast.error("週のイベント取得に失敗しました");
            }
        };
        fetchWeekEvents();
    }, [weekStart, token]);

    return (
        <div className="week-view grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
                const dateStr = day.toISOString().split("T")[0];
                const dayEvents = events.filter(e => e.date === dateStr);

                return (
                    <div key={idx} className="border p-2">
                        <div className="font-bold">
                            {`${WEEKDAYS[day.getDay()]} (${day.getMonth() + 1}/${day.getDate()})`}
                        </div>
                        <ul className="mt-1 space-y-1">
                            {dayEvents.map(event => (
                                <li key={event.id} className="text-sm bg-gray-100 p-1 rounded">
                                    {event.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default WeekView;
