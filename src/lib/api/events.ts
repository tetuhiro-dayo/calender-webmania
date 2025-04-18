import { EventType } from "@/types";
import { fetchWithError } from "./api";

// イベント取得（期間指定）
export const FetchEvents = async (start: string, end: string, token: string) => {
    return fetchWithError(`/events/range?start=${start}&end=${end}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });
};

// イベント追加
export const CreateEvent = async ({ title, date, token }: { title: string; date: string; token: string }) => {
    return fetchWithError("/events/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title,
            date: date,
        }),
    });
};

export const updateEvent = async (id: number, data: Partial<EventType>, token: string) => {
    const res = await fetch(`/events/${id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const deleteEvent = async (id: number, token: string) => {
    const res = await fetch(`/events/${id}/delete`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
};
