export type JobItemType = {
    id: number,
    title: string,
    badgeLetters: string,
    company: string,
    relevanceScore: number,
    daysAgo: number
};

export type JobItemContentType = JobItemType &{
    description: string,
    qualifications: string[],
    reviews: string[],
    duration: string,
    salary: string,
    location: string,
    coverImgURL: string,
    companyURL: string
};

export type SortByType = "relevant" | "recent";
