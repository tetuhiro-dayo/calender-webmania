"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login as PostLogin } from "@/lib/api";
import { toast } from "react-hot-toast";
import Link from "next/link";
import "@/styles/form.css";

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await PostLogin({ username, password });
            localStorage.setItem("token", res.token); // トークン保存
            router.push("/"); // トップページへリダイレクト
        } catch (err) {
            const message = err instanceof Error ? err.message : "不明なエラーが発生しました";
            toast.error(message);
        }
    };

    return (
        <div className="container">
            <h1>ログイン</h1>
            <form onSubmit={handleLogin}>
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
                <Link href="/signup">新規登録はこちら</Link>
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
}
