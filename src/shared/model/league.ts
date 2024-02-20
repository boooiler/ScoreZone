export interface League {
    id: number
    name: string
    type: "Cup" | "League"
    logo: string
    country: CountryInfo
    seasons: SeasonInfo[]
}

export interface CountryInfo {
    id: number
    name: string
    code: string | null
    flag: string | null
}

export interface SeasonInfo {
    season: number
    start: string
    end: string
    current: boolean
}