import Login from "@/components/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ログイン | カレンダー",
};

export default function LoginPage() {
    return <Login />;
}
