import { redirect } from "next/navigation";

export default function HomePage() {
    const now = new Date();
    redirect(`/month/${now.getFullYear()}-${now.getMonth() + 1}`);

    return null;
}
