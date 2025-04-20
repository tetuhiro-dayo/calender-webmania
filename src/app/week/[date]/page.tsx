import CalenderPage from "@/components/calenderPage";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ date: string }>;
}

export default async function WeekPage({ params }: Props) {
    const parsedDate = new Date((await params).date);
    if (isNaN(parsedDate.getTime())) notFound();

    return <CalenderPage date={parsedDate} viewType="week" />;
}
