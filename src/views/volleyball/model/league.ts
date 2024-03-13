export interface VolleyballLeagueCountry {
    id: number;
    name: string;
    code: string;
    flag: string;
}

export interface VolleyballLeagueSeason {
    season: number;
    current: boolean;
    start: string;
    end: string;
}

export interface VolleyballLeagueInfo {
    id: number;
    name: string;
    type: string;
    logo: string;
    country: VolleyballLeagueCountry;
    seasons: VolleyballLeagueSeason[];
}