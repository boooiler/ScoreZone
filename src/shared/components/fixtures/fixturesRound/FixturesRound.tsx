import { FixtureRow } from "@/shared/components/fixtures/fixtureRow/FixtureRow"
import { FixtureMatch, FixtureMatchDay } from "@/shared/model/fixtures"
import { OtherSports } from "@/shared/model/league"

import "./styles.scss"

interface Props {
  sport: OtherSports
  fixtures: FixtureMatchDay
  round: string
}
export const FixturesRound = ({ sport, fixtures, round }: Props) => {

  return (
    <div className="fixtures-round">
      <h4>{round}</h4>
      {fixtures[round]
        .sort((a: FixtureMatch, b: FixtureMatch) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((fixture: FixtureMatch) => (
          <FixtureRow 
            key={fixture.id}
            sport={sport}
            id={fixture.id}
            date={fixture.date}
            teamHome={{ 
              name: fixture.teams.home.name, 
              logo: fixture.teams.home.logo 
            }}
            teamAway={{ 
              name: fixture.teams.away.name, 
              logo: fixture.teams.away.logo 
            }}
            scores={{ 
              home: fixture.scores.home, 
              away: fixture.scores.away 
            }}
            shortStatus={fixture.status.short}
          />
        ))}
    </div>
  )
}