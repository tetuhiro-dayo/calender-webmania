import CalenderPage from "@/components/calenderPage";
import { isValid } from "@/functions/isValid";
import { notFound, redirect } from "next/navigation";

interface Props {
    params: Promise<{ month: string }>;
}

export default async function MonthPage({ params }: Props) {
    const { month: paramMonth } = await params;
    const [yearStr, monthStr] = paramMonth.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    if (isValid(year, month)) {
        notFound();
    }

    // ゼロ埋めしたURLにリダイレクト（例: 2025-4 → 2025-04）
    const formatted = `${year}-${String(month).padStart(2, "0")}`;
    if (paramMonth !== formatted) {
        redirect(`/month/${formatted}`);
    }

    const date = new Date(year, month - 1); // Dateは0始まりの月！

    return <CalenderPage date={date} viewType="month" />;
}
