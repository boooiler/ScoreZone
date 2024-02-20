export interface FootballFixture {
    fixture: FootballFixtureLeague
    league: FootballFixtureLeague
    teams: {
        home: FootballFixtureTeam
        away: FootballFixtureTeam
    }
    goals: FootballFixtureGoals
    score: FootballFixtureScore
    events: any
    lineups: any
    statistics: any
    players: any
}

export interface FootballFixtureDetails {
    id: number
    referee: string | null
    timezone: string
    date: string
    timestamp: number
    periods: {
      first: string | null
      second: string | null
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

export interface FootballFixtureLeague {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
    round: string
} 

export interface FootballFixtureTeam {
    id: number
    name: string
    logo: string
    winner: boolean | null
}

export interface FootballFixtureGoals {
    home: number | null
    away: number | null
}

export interface FootballFixtureScore {
    halftime: FootballFixtureGoals
    fulltime: FootballFixtureGoals
    extratime: FootballFixtureGoals
    penalty: FootballFixtureGoals
}

export interface FootballFixtureMatchDay {
    [round: string]: FootballFixture[]
}