export const isValid = (year: number, month: number) =>
    !year || !month || month < 1 || month > 12 || Number.isNaN(year) || Number.isNaN(month);
