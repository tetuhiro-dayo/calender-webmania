"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Register as PostRegister } from "@/lib/api";
import { toast } from "react-hot-toast";
import Link from "next/link";
import "@/styles/form.css";

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await PostRegister({ email, password });
            toast.success("登録が完了しました！ログインしてください。");
            setTimeout(() => router.push("/login"), 1500); // 1.5秒後にログインページへ
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
                    <label>メールアドレス</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>パスワード</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <Link href="/login">アカウントを持っていますか？</Link>
                <button type="submit">登録</button>
            </form>
        </div>
    );
}
