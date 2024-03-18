export interface VolleyballStandingGroup {
    name: string
}

export interface VolleyballStandingTeam {
    id: number
    name: string
    logo: string
}

export interface VolleyballStandingLeague {
    id: number
    name: string
    type: string
    logo: string
    season: number
}

export interface VolleyballStandingCountry {
    id: number
    name: string
    code: string
    flag: string
}

export interface VolleyballStandingWinLossStats {
    total: number
    percentage: string
}

export interface VolleyballStandingGameStats {
    played: number
    win: VolleyballStandingWinLossStats
    lose: VolleyballStandingWinLossStats
}

export interface VolleyballStandingGoals {
    for: number
    against: number
}

export interface VolleyballStandingInfo {
    position: number
    stage: string
    group: VolleyballStandingGroup
    team: VolleyballStandingTeam
    league: VolleyballStandingLeague
    country: VolleyballStandingCountry
    games: VolleyballStandingGameStats
    goals: VolleyballStandingGoals
    points: number
    form: string
    description: string
}