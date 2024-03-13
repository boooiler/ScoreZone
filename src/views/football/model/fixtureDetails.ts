export interface FootballFixtureDetails {
    id: number
    referee: string | null
    timezone: string
    date: string
    timestamp: number
    periods: {
        first: number | null
        second: number | null
    }
    venue: {
        id: number
        name: string
        city: string
    }
    status: {
        long: string
        short: string
        elapsed: number | null
    }
}

export interface FootballFixtureTeam {
    id: number
    name: string
    logo: string
    winner: null | boolean
}

export interface FootballFixtureEvent {
    time: {
        elapsed: number
        extra: number | null
    }
    team: FootballFixtureTeam
    player: {
        id: number | null
        name: string
    }
    assist: {
        id: number | null
        name: string | null
    }
    type: string
    detail: string
    comments: string | null
}

export interface FootballLineupPlayer {
    id: number
    name: string
    number: number | null
    pos: string | null
    grid: string | null
}

export interface FootballLineup {
    team: FootballFixtureTeam
    coach: {
        id: number
        name: string
        photo: string
    }
    formation: string | null
    startXI: FootballLineupPlayer[]
    substitutes: FootballLineupPlayer[]
}

export interface FootballStatistics {}

export interface FootballPlayer {}

export interface FootballMatch {
    fixture: FootballFixtureDetails
    league: {
        id: number
        name: string
        country: string
        logo: string
        flag: string
        season: number
        round: string
    }
    teams: {
        home: FootballFixtureTeam
        away: FootballFixtureTeam
    }
    goals: {
        home: number | null
        away: number | null
    }
    score: {
        halftime: {
            home: number | null
            away: number | null
        }
        fulltime: {
            home: number | null
            away: number | null
        }
        extratime: {
            home: number | null
            away: number | null
        }
        penalty: {
            home: number | null
            away: number | null
        }
    }
    events: FootballFixtureEvent[]
    lineups: FootballLineup[]
    statistics: FootballStatistics[]
    players: FootballPlayer[]
}
