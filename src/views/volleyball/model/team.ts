export interface Team {
    id: number
    name: string
    logo: string
    national: boolean
    country: TeamCountry
}

export interface TeamCountry{
    id: number
    name: string
    code: string
    flag: string
}