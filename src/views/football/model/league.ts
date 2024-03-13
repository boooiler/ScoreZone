export interface FootballLeague {
    league: FootballLeagueInfo
    country: FootballCountryInfo
    seasons: FootballSeasonInfo[]
}

export interface FootballLeagueInfo {
    id: number
    name: string
    type: "Cup" | "League"
    logo: string
}

export interface FootballCountryInfo {
    name: string
    code: string | null
    flag: string | null
}

export interface FootballSeasonInfo {
    year: number
    start: string
    end: string
    current: boolean
    coverage: unknown
}

