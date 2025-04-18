import { fetchWithError } from "./api";

// ログイン
export const Login = async (credentials: { username: string; password: string }) => {
    return fetchWithError("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
};

// 登録
export const Register = async (data: { username: string; password: string }) => {
    return fetchWithError("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};
