const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchEvents = async (start: string, end: string, token: string) => {
    const res = await fetch(`${baseURL}/events/range?start=${start}&end=${end}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // SSRならこのオプションがあると便利（任意）
    });

    if (!res.ok) {
        throw new Error("イベント取得に失敗しました");
    }

    const data = await res.json();
    return data;
};

export const Login = async (object: { email: string; password: string }) => {
    const res = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
    });
    if (!res.ok) {
        throw new Error("ログインに失敗しました。");
    }

    const data = await res.json();
    return data;
};

export const Register = async ({ email, password }: { email: string; password: string }) => {
    const res = await fetch(`${baseURL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "登録に失敗しました。");
    }

    return await res.json();
};

export const createEvent = async ({
    title,
    date,
    token,
}: {
    title: string;
    date: string; // "YYYY-MM-DD"
    token: string;
}) => {
    const res = await fetch(`${baseURL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, date }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "イベント作成に失敗しました。");
    }

    return await res.json();
};

export const createArt = async (formData: FormData) => {
    const res = await fetch(`${baseURL}/arts`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "イベント作成に失敗しました。");
    }

    return await res.json();
};
