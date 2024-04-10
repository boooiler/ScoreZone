export interface FixtureCountry {
    id: number
    name: string
    code: string
    flag: string
}

export interface FixtureLeague {
    id: number
    name: string
    type: string
    logo: string
    season: number
}

export interface FixtureTeam {
    id: number
    name: string
    logo: string
}

export interface FixtureStatus {
    long: string
    short: string
}

export interface FixturePeriodScores {
    home: number
    away: number
}

export interface FixtureMatch {
    id: number
    date: string
    time: string
    timestamp: number
    timezone: string
    week: string
    status: FixtureStatus
    country: FixtureCountry
    league: FixtureLeague
    teams: {
        home: FixtureTeam
        away: FixtureTeam
    }
    scores: {
        home: number
        away: number
    }
    periods: {
        first: FixturePeriodScores
        second: FixturePeriodScores
        third: FixturePeriodScores
        fourth: FixturePeriodScores
        fifth: FixturePeriodScores
    }
}

export interface FixtureMatchDay {
    [round: string]: FixtureMatch[]
}