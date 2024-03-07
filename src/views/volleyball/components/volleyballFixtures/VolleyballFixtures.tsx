import { useEffect, useState } from "react"
// import { useVolleyballFixtures } from "../../api/footballQuery"
import Loader from "@/shared/components/loader"
// import { FootballFixture, FootballFixtureMatchDay } from "../../model/fixtures"
import "./styles.scss"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import { useVolleyballGames } from "../../api/volleyballQuery"
import { VolleyballFixtureMatch } from "../../model/fixtures"

interface Props {
    league: number
    season: number
    fixturesType: "planned" | "finished"
    team?: number
}
export const VolleyballFixtures = ({ league, season, fixturesType, team }: Props) => {
  const navigate = useNavigate()
  const { data: fixturesData, isLoading } = useVolleyballGames(undefined, league, season, team, undefined)
  const { data: finishedFixturesData, isLoading: isLoadingFinishedFixtures } = useVolleyballGames(undefined, league, season, team, undefined)
  const [fixtures, setFixtures] = useState<VolleyballFixtureMatch>()

  useEffect(() => {
    if(fixturesData && finishedFixturesData && fixturesType) {
      const sortedFinishedFixtures = finishedFixturesData.sort().reverse()
      const fixtures = fixturesType === "planned" ? fixturesData : sortedFinishedFixtures
      setFixtures(groupFixtures(fixtures))
      console.log(groupFixtures(fixtures))
    }
  }, [fixturesData, finishedFixturesData, fixturesType])

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
        {isLoading || isLoadingFinishedFixtures || !fixtures ? (
          <Loader />
        ) : Object.keys(fixtures).map((round: string, index: number) => (
          <div key={index} className="fixtures-wrapper--round">
            <h4>{round}</h4>
            {/* {fixtures[round]
              .sort((a: VolleyballFixtureMatch, b: VolleyballFixtureMatch) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((fixture: VolleyballFixtureMatch) => (
                <div 
                  key={fixture.id} 
                  className="fixtures-wrapper--round__score"
                  onClick={() => navigate(`/football/fixtures/${fixture.id}`)}
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
                    {fixturesType === 'finished' ? (
                      <><div>{fixture.goals.home}</div> : <div>{fixture.goals.away}</div></>
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
              ))} */}
          </div>
        ))}
      </section>
    </>
  )
}