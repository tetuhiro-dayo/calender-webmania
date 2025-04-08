"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Register } from "@/lib/api";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await Register({ email, password });
            setSuccess("登録が完了しました！ログインしてください。");
            setTimeout(() => router.push("/login"), 1500); // 1.5秒後にログインページへ
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "登録に失敗しました。");
        }
    };

    return (
        <div className="register-container">
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
                <button type="submit">登録</button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    );
}
