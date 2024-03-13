export interface Country {
    id: number
    name: string
    code: string
    flag: string
}

export interface League {
    id: number
    name: string
    type: string
    logo: string
    season: number
}

export interface Team {
    id: number
    name: string
    logo: string
}

export interface Status {
    long: string
    short: string
}

export interface PeriodScores {
    home: number
    away: number
}

export interface Match {
    id: number
    date: string
    time: string
    timestamp: number
    timezone: string
    week: string
    status: Status
    country: Country
    league: League
    teams: {
        home: Team
        away: Team
    }
    scores: {
        home: number
        away: number
    }
    periods: {
        [period: string]: PeriodScores
    }
}
