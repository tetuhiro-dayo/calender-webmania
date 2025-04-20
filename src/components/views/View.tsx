import DayView from "./dayVIew";
import MonthView from "./monthView";
import WeekView from "./weekView";
import { ViewType } from "@/types";
import YearView from "./yearView";

interface Props {
    date: Date;
    token: string;
    viewType: ViewType;
    onDateClick?: (date: string) => void;
}

const View = ({ date, token, viewType, onDateClick }: Props) => {
    switch (viewType) {
        case "month":
            return <MonthView date={date} token={token} onDateClick={onDateClick!} />;
        case "week":
            return <WeekView date={date} token={token} />;
        case "day":
            return <DayView date={date} token={token} />;
        case "year":
            const year = date.getFullYear();
            return <YearView year={year} />;
        default:
            return null;
    }
};

export default View;
