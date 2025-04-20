"use client";

import Link from "next/link";

interface Props {
    year: number;
}

const YearView = ({ year }: Props) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {months.map(month => (
                <Link
                    key={month}
                    href={`/month/${year}-${String(month).padStart(2, "0")}`}
                    className="p-4 border rounded hover:bg-gray-100 text-center">
                    {month}月
                </Link>
            ))}
        </div>
    );
};

export default YearView;
