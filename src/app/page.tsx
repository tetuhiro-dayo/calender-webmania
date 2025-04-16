import type { Metadata } from "next";
import Calender from "@/components/calender";

export const metadata: Metadata = {
    title: "カレンダー",
};

export default function Home() {
    return <Calender />;
}
