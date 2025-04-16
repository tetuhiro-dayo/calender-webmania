import toast from "react-hot-toast";

export const error = (err: unknown) => {
    const message = err instanceof Error ? err.message : String(err);
    toast.error(message);
    console.error(message);
};
