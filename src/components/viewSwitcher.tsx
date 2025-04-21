"use client";

import { ViewType } from "@/types";
import Link from "next/link";

interface Props {
    viewType: ViewType;
    date: Date;
}

const ViewSwitcher = ({ viewType, date }: Props) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return (
        <div className="view-switcher">
            <Link className={`button ${viewType === "year" ? "active" : ""}`} href={`/year/${year}`}>
                年
            </Link>
            <Link className={`button ${viewType === "month" ? "active" : ""}`} href={`/month/${year}-${month}`}>
                月
            </Link>
            <Link className={`button ${viewType === "week" ? "active" : ""}`} href={`/week/${year}-${month}-${day}`}>
                週
            </Link>
            <Link className={`button ${viewType === "day" ? "active" : ""}`} href={`/day/${year}-${month}-${day}`}>
                日
            </Link>
        </div>
    );
};

export default ViewSwitcher;
