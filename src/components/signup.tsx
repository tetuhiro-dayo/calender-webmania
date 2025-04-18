"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Register as PostRegister } from "@/lib/api/auth";
import { toast } from "react-hot-toast";
import Link from "next/link";
import "@/styles/form.css";

export default function Register() {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await PostRegister({ username, password });
            toast.success("登録が完了しました！ログインしてください。");
            setTimeout(() => router.push("/login"), 1 /*s*/ * 1000); // 1秒後にログインページへ
        } catch (err) {
            const message = err instanceof Error ? err.message : "不明なエラーが発生しました";
            toast.error(message || "登録に失敗しました。");
        }
    };

    return (
        <div className="container">
            <h2>新規登録</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="username">ユーザーネーム</label>
                    <input
                        id="username"
                        type="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">パスワード</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Link href="/login">アカウントを持っていますか？</Link>
                <button type="submit">登録</button>
            </form>
        </div>
    );
}
