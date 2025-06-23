export interface VisitDto {
    totalVisits: number;
    uniqueVisits: number;
    lastVisit: string;
    socialClicks: {
        youtube: number;
        instagram: number;
        twitch: number;
    };
} 