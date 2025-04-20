export const isToday = (target: Date) => {
    const now = new Date();
    return (
        now.getFullYear() === target.getFullYear() &&
        now.getMonth() === target.getMonth() &&
        now.getDate() === target.getDate()
    );
};
