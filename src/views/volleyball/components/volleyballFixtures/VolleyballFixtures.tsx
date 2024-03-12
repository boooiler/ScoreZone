import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import Loader from "@/shared/components/loader"
import { useVolleyballGames } from "../../api/volleyballQuery"
import { VolleyballFixtureMatch, VolleyballFixtureMatchDay } from "../../model/fixtures"
import "./styles.scss"

interface Props {
  sport: "volleyball" | "handball"
  league?: number
  season: number
  fixturesType: "planned" | "finished"
  team?: number
}
export const VolleyballFixtures = ({ sport, league, season, fixturesType, team }: Props) => {
  // const navigate = useNavigate()
  const { data: fixturesData, isLoading } = useVolleyballGames(sport, undefined, league, season, team, undefined)
  const [fixtures, setFixtures] = useState<VolleyballFixtureMatchDay>()

  useEffect(() => {
    if(fixturesData && fixturesType) {
      const sortedFinishedFixtures = fixturesData.filter((f: any) => f.status.short === 'FT')
      const plannedFixtures = fixturesData.filter((f: any) => f.status.short === 'NS')
      const fixtures = fixturesType === "planned" ? plannedFixtures : sortedFinishedFixtures
      setFixtures(groupFixtures(fixtures))
    }
  }, [fixturesData, fixturesType])

  const groupFixtures = (fixtures: VolleyballFixtureMatch[]) => {
    const groupedFixtures = fixtures.reduce((acc: any, fixture: VolleyballFixtureMatch) => {
      const { week } = fixture
      if (!acc[week]) {
        acc[week] = []
      }
      acc[week].push(fixture)
      return acc
    }, {})
    return groupedFixtures
  }

  return (
    <>
      <section className="fixtures-wrapper">
        {isLoading || !fixtures ? (
          <Loader />
        ) : Object.keys(fixtures).sort().reverse().map((round: string, index: number) => (
          <div key={index} className="fixtures-wrapper--round">
            <h4>Week {round}</h4>
            {fixtures[round]
              .sort((a: VolleyballFixtureMatch, b: VolleyballFixtureMatch) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((fixture: VolleyballFixtureMatch) => (
                <div 
                  key={fixture.id} 
                  className="fixtures-wrapper--round__score"
                  // onClick={() => navigate(`/${sport}/fixtures/${fixture.id}`)}
                >
                  <div className="match-date">
                    <b>{moment(fixture.date).format("HH:mm")}</b>
                    <p>{moment(fixture.date).format("DD/MM/YY")}</p>
                  </div>
                  <div className="team">
                    <img
                      src={fixture.teams.home.logo}
                      alt="team logo"
                    />
                    <span>{fixture.teams.home.name}</span>
                  </div>
                  <div className="score">
                    {fixture.status.short === 'FT' ? (
                      <><div>{fixture.scores.home}</div> : <div>{fixture.scores.away}</div></>
                    ) : (
                      <><div>-</div> : <div>-</div></>
                    )}
                  </div>
                  <div className="team">
                    <span>{fixture.teams.away.name}</span>
                    <img
                      src={fixture.teams.away.logo}
                      alt="team logo"
                    />
                  </div>
                </div>
              ))}
          </div>
        ))}
      </section>
    </>
  )
}