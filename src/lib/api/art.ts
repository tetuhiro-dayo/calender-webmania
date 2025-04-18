import { fetchWithError } from "./api";

export const GetArt = async ({ year, month }: { year: number; month: number }) => {
    const params = new URLSearchParams({ year: String(year), month: String(month) });
    return fetchWithError(`/art?${params}`, {
        method: "GET",
    });
};

// イラスト投稿
export const CreateArt = async (formData: FormData, token: string) => {
    return fetchWithError("/art/add", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: formData,
    });
};
