"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await Login({ email, password });
            localStorage.setItem("token", res.token); // トークン保存
            router.push("/"); // トップページへリダイレクト
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "不明なエラーが発生しました");
        }
    };

    return (
        <div className="login-container">
            <h2>ログイン</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>メールアドレス</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>パスワード</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit">ログイン</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}
