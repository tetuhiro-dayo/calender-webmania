import type { Metadata } from "next";
import Home from "@/components/home";

export const metadata: Metadata = {
    title: "カレンダー",
};

export default function HomePage() {
    return <Home />;
}
