export const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") || "" : "");
