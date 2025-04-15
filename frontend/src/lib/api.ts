// lib/api.ts
const baseURL = "/api"; // 相対パスならVercelでもOK

// 共通Fetchヘルパー
const fetchWithError = async (input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(input, init);
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "通信エラーが発生しました。");
    }
    return res.json();
};

// イベント取得（期間指定）
export const FetchEvents = async (start: string, end: string, token: string) => {
    return fetchWithError(`${baseURL}/events/range?start=${start}&end=${end}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });
};

// ログイン
export const Login = async (credentials: { username: string; password: string }) => {
    return fetchWithError(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
};

// 登録
export const Register = async (data: { username: string; password: string }) => {
    return fetchWithError(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

// イベント追加
export const CreateEvent = async ({ title, date, token }: { title: string; date: string; token: string }) => {
    return fetchWithError(`${baseURL}/events/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title,
            start_date: date,
            end_date: date,
        }),
    });
};

// イラスト投稿
export const CreateArt = async (formData: FormData, token: string) => {
    return fetchWithError(`${baseURL}/arts`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
};
