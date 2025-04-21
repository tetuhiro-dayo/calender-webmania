const baseURL = "/api"; // 相対パスでVercel対応

// 共通Fetchヘルパー
export const fetchWithError = async (input: string, init?: RequestInit) => {
    const res = await fetch(baseURL + input, init);

    const isJSON = res.headers.get("content-type")?.includes("application/json");

    if (!res.ok) {
        const error = isJSON ? await res.json().catch(() => ({})) : {};
        if (res.status === 401) {
            return null; // 認証エラーは呼び出し元で分岐可能に
        }
        throw new Error(error.message || "通信エラーが発生しました。");
    }

    return isJSON ? res.json() : res.text(); // JSON以外にも対応可
};
