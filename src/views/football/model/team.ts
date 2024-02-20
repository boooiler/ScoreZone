export interface FootballTeam {
    team: FootballTeamDetails
    venue: FootballVenue
}

export interface FootballTeamDetails {
    id: number
    name: string
    code: string
    country: string
    founded: number
    national: boolean
    logo: string
}

export interface FootballVenue {
    id: number
    name: string
    address: string
    city: string
    capacity: number
    surface: string
    image: string
}