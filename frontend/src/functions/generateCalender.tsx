import { EventType } from "@/types";

export const generateCalendar = (
    year: number,
    month: number,
    events: EventType[],
    onDateClick: (date: string) => void,
) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const startDay = startDate.getDay();
    const daysInMonth = endDate.getDate();

    const weeks = [];
    let day = 1;
    let nextDay = 1;

    for (let i = 0; i < 6; i++) {
        const days = [];

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startDay) {
                // 前月の末尾の日付を埋める
                const prevMonthLastDate = new Date(year, month - 1, 0).getDate();
                const date = prevMonthLastDate - (startDay - j - 1);
                days.push(
                    <td key={`empty-prev-${i}-${j}`} className="is-disabled">
                        {date}
                    </td>,
                );
            } else if (day > daysInMonth) {
                // 翌月の先頭日付を埋める
                days.push(
                    <td key={`empty-next-${i}-${j}`} className="is-disabled">
                        {nextDay}
                    </td>,
                );
                nextDay++;
            } else {
                const currentDateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const todayStr = new Date().toLocaleDateString("sv-SE"); // sv-SEにするとyyyy-mm-ddにしてくれるらしい。神。
                const dayEvents = events.filter(e => {
                    if (e.date === currentDateStr) {
                        return true;
                    }
                    if (e.date === `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`) {
                        return true;
                    }
                });
                const isToday = currentDateStr === todayStr;

                days.push(
                    <td
                        key={`day-${day}`}
                        className={`calendar-day ${isToday ? "today" : ""} ${dayEvents.length ? "has-events" : ""}`}
                        onClick={() => onDateClick(currentDateStr)}>
                        <div className="day-number">{day}</div>
                        {dayEvents.map((event, idx) => (
                            <div key={idx} className="calendar-event">
                                {event.title}
                            </div>
                        ))}
                    </td>,
                );
                day++;
            }
        }

        weeks.push(<tr key={`week-${i}`}>{days}</tr>);
    }

    return weeks;
};
