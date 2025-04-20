import { notFound } from "next/navigation";
import CalenderPage from "@/components/calenderPage";
import { parseDateParam } from "@/functions/parseDateParam";

interface Props {
    params: Promise<{ day: string }>; // 例: "2025-04-21"
}

export default async function DayPage({ params }: Props) {
    const date = parseDateParam((await params).day);
    if (!date) notFound();

    return <CalenderPage date={date} viewType="day" />;
}
