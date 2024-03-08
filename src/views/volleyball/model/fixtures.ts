export interface VolleyballFixtureCountry {
    id: number;
    name: string;
    code: string;
    flag: string;
}

export interface VolleyballFixtureLeague {
    id: number;
    name: string;
    type: string;
    logo: string;
    season: number;
}

export interface VolleyballFixtureTeam {
    id: number;
    name: string;
    logo: string;
}

export interface VolleyballFixtureStatus {
    long: string;
    short: string;
}

export interface VolleyballFixturePeriodScores {
    home: number;
    away: number;
}

export interface VolleyballFixtureMatch {
    id: number;
    date: string;
    time: string;
    timestamp: number;
    timezone: string;
    week: string;
    status: VolleyballFixtureStatus;
    country: VolleyballFixtureCountry;
    league: VolleyballFixtureLeague;
    teams: {
        home: VolleyballFixtureTeam;
        away: VolleyballFixtureTeam;
    };
    scores: {
        home: number;
        away: number;
    };
    periods: {
        first: VolleyballFixturePeriodScores;
        second: VolleyballFixturePeriodScores;
        third: VolleyballFixturePeriodScores;
        fourth: VolleyballFixturePeriodScores;
        fifth: VolleyballFixturePeriodScores;
    };
}

export interface VolleyballFixtureMatchDay {
    [round: string]: VolleyballFixtureMatch[]
}