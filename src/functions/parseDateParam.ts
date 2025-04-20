export const parseDateParam = (str: string): Date | null => {
    const [y, m, d] = str.split("-").map(Number);
    if (!y || !m || !d || m < 1 || m > 12 || d < 1 || d > 31) return null;
    const date = new Date(y, m - 1, d);
    return isNaN(date.getTime()) ? null : date;
};
