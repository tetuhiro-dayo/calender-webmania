"use client";

import { useEffect, useState } from "react";
import { FetchEvents } from "@/lib/api/events";
import { EventType } from "@/types";
import toast from "react-hot-toast";
import { getToken } from "@/functions/getToken";
import { isToday } from "@/functions/isToday";

interface Props {
    date: Date;
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

const WeekView = ({ date }: Props) => {
    const weekStart = getWeekStart(date);
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const token = getToken();

    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        const fetchWeekEvents = async () => {
            const start = weekStart.toISOString().split("T")[0];
            const end = addDays(weekStart, 7).toISOString().split("T")[0];

            try {
                const result = await FetchEvents(start, end, token);
                if (result) {
                    setEvents(result);
                }
            } catch (err: unknown) {
                console.error(err);
                toast.error("週のイベント取得に失敗しました");
            }
        };
        fetchWeekEvents();
    }, [weekStart, token]);

    return (
        <div className="week-view">
            {days.map((day, idx) => {
                const dateStr = day.toISOString().split("T")[0];
                const dayEvents = events.filter(e => e.date === dateStr);

                return (
                    <div key={idx} className={isToday(day) ? "today" : ""}>
                        <div className="font-bold">
                            {`${WEEKDAYS[day.getDay()]} (${day.getMonth() + 1}/${day.getDate()})`}
                        </div>
                        <ul>
                            {dayEvents.map(event => (
                                <li key={event.id}>{event.title}</li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default WeekView;
