import { useEffect, useState } from "react"
import { useFootballFixtures } from "../../api/footballQuery"
import Loader from "@/shared/components/loader"
import { FootballFixture, FootballFixtureMatchDay } from "../../model/fixtures"
import "./styles.scss"
import moment from "moment"
import { useNavigate } from "react-router-dom"

interface Props {
    league: number
    season: number
    fixturesType: "planned" | "finished"
    team?: number
}
export const FootballFixtures = ({ league, season, fixturesType, team }: Props) => {
  const navigate = useNavigate()
  const { data: fixturesData, isLoading } = useFootballFixtures(undefined, league, season, "TBD-NS-PST-CANC-ABD-AWD", undefined, team)
  const { data: finishedFixturesData, isLoading: isLoadingFinishedFixtures } = useFootballFixtures(undefined, league, season, "FT-AET-PEN-LIVE-WO", undefined, team)
  const [fixtures, setFixtures] = useState<FootballFixtureMatchDay>()

  useEffect(() => {
    if(fixturesData && finishedFixturesData && fixturesType) {
      const sortedFinishedFixtures = finishedFixturesData.sort().reverse()
      const fixtures = fixturesType === "planned" ? fixturesData : sortedFinishedFixtures
      setFixtures(groupFixtures(fixtures))
    }
  }, [fixturesData, finishedFixturesData, fixturesType])

  const groupFixtures = (fixtures: FootballFixture[]) => {
    const groupedFixtures = fixtures.reduce((acc: any, fixture: FootballFixture) => {
      const { round } = fixture.league
      if (!acc[round]) {
        acc[round] = []
      }
      acc[round].push(fixture)
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
            {fixtures[round]
              .sort((a: FootballFixture, b: FootballFixture) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime())
              .map((fixture: FootballFixture) => (
                <div 
                  key={fixture.fixture.id} 
                  className="fixtures-wrapper--round__score"
                  onClick={() => navigate(`/football/fixtures/${fixture.fixture.id}`)}
                >
                  <div className="match-date">
                    <b>{moment(fixture.fixture.date).format("HH:mm")}</b>
                    <p>{moment(fixture.fixture.date).format("DD/MM/YY")}</p>
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
              ))}
          </div>
        ))}
      </section>
    </>
  )
}