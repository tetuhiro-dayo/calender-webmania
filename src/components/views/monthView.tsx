"use client";

import { useEffect, useMemo, useState } from "react";
import { FetchEvents } from "@/lib/api/events";
import { EventType } from "@/types";
import toast from "react-hot-toast";
import { getToken } from "@/functions/getToken";
import Link from "next/link";

interface Props {
    date: Date;
    onDateClick: (date: string) => void;
    miniMode?: boolean;
}

const DAYS = ["日", "月", "火", "水", "木", "金", "土"];

const formatDate = (y: number, m: number, d: number) =>
    `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const MonthView = ({ date, onDateClick, miniMode: mini = false }: Props) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const startDay = startDate.getDay();
    const daysInMonth = endDate.getDate();
    const todayStr = new Date().toISOString().split("T")[0];
    const token = getToken();

    const [events, setEvents] = useState<EventType[]>([]);

    const handleClick = useMemo(
        () => (dateStr: string) => {
            setTimeout(() => onDateClick(dateStr), 0);
        },
        [onDateClick],
    );

    useEffect(() => {
        const fetchEventsAndUpdate = async () => {
            const start = new Date(year, month - 1, 1).toISOString().split("T")[0];
            const end = new Date(year, month, 0).toISOString().split("T")[0];

            try {
                const result = await FetchEvents(start, end, token);
                if (result) {
                    setEvents(result);
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                if (message !== "Login.") {
                    toast.error("イベントの取得に失敗しました: " + message);
                }
            }
        };

        fetchEventsAndUpdate();
    }, [token, month, year]);

    const calendarCells = useMemo(() => {
        return Array.from({ length: 42 }, (_, i) => {
            if (i < startDay) {
                const prevMonthLast = new Date(year, month - 1, 0).getDate();
                const date = prevMonthLast - (startDay - i - 1);
                return (
                    <td key={`prev-${i}`} className="is-disabled">
                        {date}
                    </td>
                );
            }

            const day = i - startDay + 1;
            if (day > daysInMonth) {
                return (
                    <td key={`next-${i}`} className="is-disabled">
                        {day - daysInMonth}
                    </td>
                );
            }

            const currentDateStr = formatDate(year, month, day);
            const dayEvents = events.filter(e => e.date === currentDateStr);
            const isToday = currentDateStr === todayStr;

            return (
                <td
                    key={`day-${i}`}
                    className={`calendar-day ${isToday ? "today" : ""} ${dayEvents.length ? "has-events" : ""}`}
                    onClick={() => handleClick(currentDateStr)}>
                    <div className="day-number">{day}</div>
                    {dayEvents.map((event, idx) => (
                        <div key={idx} className="calendar-event">
                            {event.title}
                        </div>
                    ))}
                </td>
            );
        });
    }, [events, year, month, startDay, daysInMonth, handleClick, todayStr]);

    const calenderRows = useMemo(
        () => Array.from({ length: 6 }, (_, i) => <tr key={`week-${i}`}>{calendarCells.slice(i * 7, i * 7 + 7)}</tr>),
        [calendarCells],
    );

    return (
        <div id="table" className={`calendar-table ${mini ? "mini" : ""}`}>
            {mini && (
                <Link href={`/month/${year}-${month}`} className="mini-month-title">
                    {year}年 {month}月
                </Link>
            )}
            <table>
                <thead>
                    <tr>
                        {DAYS.map(day => (
                            <th key={day}>{mini ? day[0] : day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{calenderRows}</tbody>
            </table>
        </div>
    );
};

export default MonthView;
