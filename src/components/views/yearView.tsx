"use client";

import MonthView from "./monthView";
import { useRouter } from "next/navigation";

interface Props {
    date: Date;
}

const YearView = ({ date }: Props) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const router = useRouter();
    const year = date.getFullYear();

    return (
        <div className="year-view">
            {months.map(month => (
                <MonthView
                    key={month}
                    date={new Date(year, month - 1)}
                    onDateClick={date => {
                        router.push("/day/" + date);
                    }}
                    miniMode
                />
            ))}
        </div>
    );
};

export default YearView;
