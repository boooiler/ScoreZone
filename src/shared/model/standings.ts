export interface StandingGroup {
    name: string
}

export interface StandingTeam {
    id: number
    name: string
    logo: string
}

export interface StandingLeague {
    id: number
    name: string
    type: string
    logo: string
    season: number
}

export interface StandingCountry {
    id: number
    name: string
    code: string
    flag: string
}

export interface StandingWinLossStats {
    total: number
    percentage: string
}

export interface StandingGameStats {
    played: number
    win: StandingWinLossStats
    lose: StandingWinLossStats
}

export interface StandingGoals {
    for: number
    against: number
}

export interface StandingInfo {
    position: number
    stage: string
    group: StandingGroup
    team: StandingTeam
    league: StandingLeague
    country: StandingCountry
    games: StandingGameStats
    goals: StandingGoals
    points: number
    form: string
    description: string
}