// lib/api.ts
const baseURL = "/api"; // 相対パスならVercelでもOK

// 共通Fetchヘルパー
export const fetchWithError = async (input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(baseURL + input, init);
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        if (res.status === 401) {
            throw new Error("Login.");
        }
        throw new Error(error.message || "通信エラーが発生しました。");
    }
    return res.json();
};
