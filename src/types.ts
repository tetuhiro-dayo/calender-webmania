export interface EventType {
    id: number;
    date: string;
    title: string;
    author?: string;
}

export type ArtType = {
    id: number;
    title: string;
    image_url: string;
    month: number;
    year: number;
    userId: number;
    created_at: string;
};
