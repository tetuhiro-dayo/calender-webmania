"use client";

import { EventType } from "@/types";

interface Props {
    date: Date;
    events: EventType[];
    onDateClick: (date: string) => void;
}

const formatDate = (y: number, m: number, d: number) =>
    `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const Calendar = ({ date, events, onDateClick }: Props) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const startDay = startDate.getDay();
    const daysInMonth = endDate.getDate();
    const todayStr = new Date().toISOString().split("T")[0];

    // 日付セル生成関数
    const generateCalendarCells = () =>
        Array.from({ length: 42 }, (_, i) => {
            const cellIndex = i;
            const dayOfWeek = i % 7;
            if (cellIndex < startDay) {
                const prevMonthLastDate = new Date(year, month - 1, 0).getDate();
                const date = prevMonthLastDate - (startDay - dayOfWeek - 1);
                return (
                    <td key={`prev-${i}`} className="is-disabled">
                        {date}
                    </td>
                );
            }
            const day = cellIndex - startDay + 1;
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
                    onClick={() => onDateClick(currentDateStr)}>
                    <div className="day-number">{day}</div>
                    {dayEvents.map((event, idx) => (
                        <div key={idx} className="calendar-event">
                            {event.title}
                        </div>
                    ))}
                </td>
            );
        });

    const cells = generateCalendarCells();
    const calendarRows = Array.from({ length: 6 }, (_, i) => (
        <tr key={`week-${i}`}>{cells.slice(i * 7, i * 7 + 7)}</tr>
    ));

    return (
        <div id="table" className="calendar-table">
            <table>
                <thead>
                    <tr>
                        {["日", "月", "火", "水", "木", "金", "土"].map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{calendarRows}</tbody>
            </table>
        </div>
    );
};

export default Calendar;
