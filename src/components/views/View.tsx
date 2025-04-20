import DayView from "./dayView";
import MonthView from "./monthView";
import WeekView from "./weekView";
import { ViewType } from "@/types";
import YearView from "./yearView";

interface Props {
    date: Date;
    viewType: ViewType;
    onDateClick?: (date: string) => void;
}

const View = ({ date, viewType, onDateClick }: Props) => {
    switch (viewType) {
        case "month":
            return <MonthView date={date} onDateClick={onDateClick!} />;
        case "week":
            return <WeekView date={date} />;
        case "day":
            return <DayView date={date} />;
        case "year":
            const year = date.getFullYear();
            return <YearView year={year} />;
        default:
            return null;
    }
};

export default View;
