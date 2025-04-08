type SeasonalArt = {
    url: string;
    author: string;
    year: number;
    month: number;
};

const arts: SeasonalArt[] = [
    {
        url: "/images/noImage.svg",
        author: "NotAPro",
        year: 2025,
        month: 4,
    },
];

export const getArt = (year: number, month: number) => {
    return arts.find(art => art.year === year && art.month === month) || arts[0];
};
