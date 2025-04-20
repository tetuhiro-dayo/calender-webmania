import { redirect } from "next/navigation";

export default function HomePage() {
    const now = new Date();
    const year = String(now.getFullYear()).padStart(4, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    redirect(`/month/${year}-${month}`);

    return null;
}
