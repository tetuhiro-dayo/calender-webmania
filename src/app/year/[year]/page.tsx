import { notFound } from "next/navigation";
import CalenderPage from "@/components/calenderPage";

interface Props {
    params: Promise<{ year: string }>;
}

export default async function YearPage({ params }: Props) {
    const year = parseInt((await params).year, 10);
    if (isNaN(year)) {
        notFound();
    }

    return <CalenderPage date={new Date(year)} viewType="year" />;
}
