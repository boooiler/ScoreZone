export interface FootballStandings {
    league: {
        id: number
        name: string
        country: string
        logo: string
        url: string
        season: number
        standings: FootballStandingInfo[][]
    }
}

export interface FootballStandingInfo {
    rank: number
    team: FootballStandingTeam
    points: number
    goalsDiff: number
    group: string
    form: string
    status: string
    description: string
    all: FinishedStandings
    home: FinishedStandings
    away: FinishedStandings
    update: string
}

export interface FootballStandingTeam {
    id: number
    name: string
    logo: string
}

export interface FinishedStandings {
    played: number
    win: number
    draw: number
    lose: number
    goals: {
        for: number
        against: number
    }
}