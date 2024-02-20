import { useEffect, useState } from "react"
import { useFootballFixtures } from "../../api/footballQuery"
import Loader from "@/shared/components/loader"
import { FootballFixture, FootballFixtureMatchDay } from "../../model/fixtures"
import "./styles.scss"

interface Props {
    league: number
    season: number
    fixturesType: "planned" | "finished"
}
export const FootballFixtures = ({ league, season, fixturesType }: Props) => {
  const { data: fixturesData, isLoading } = useFootballFixtures(undefined, league, season, "TBD-NS-PST-CANC-ABD-AWD")
  const { data: finishedFixturesData, isLoading: isLoadingFinishedFixtures } = useFootballFixtures(undefined, league, season, "FT-AET-PEN-LIVE-WO")
  const [fixtures, setFixtures] = useState<FootballFixtureMatchDay>()
  const [finishedFixtures, setFinishedFixtures] = useState<FootballFixtureMatchDay>()

  useEffect(() => {
    if(fixturesData) {
      console.log(groupFixtures(fixturesData))
      setFixtures(groupFixtures(fixturesData))
    }
  }, [fixturesData])

  useEffect(() => {
    if(finishedFixturesData) {
      setFinishedFixtures(groupFixtures(finishedFixturesData))
    }
  }, [finishedFixturesData])

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
      {fixturesType === "planned" ? (
        <>
          <h2 style={{ marginTop: 0 }}>Mecze do rozegrania</h2>
          <div>
            {isLoading || !fixtures ? (
              <Loader />
            ) : Object.keys(fixtures).map((round: string, index: number) => (
              <div key={index}>
                <h4>{round}</h4>
                {fixtures[round].map((fixture: FootballFixture) => (
                  <div key={fixture.fixture.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="team">
                      <img
                        src={fixture.teams.home.logo}
                        alt="logo"
                        style={{
                          width: "20px",
                          height: "20px",
                          objectFit: "contain",
                          marginRight: "5px"
                        } as React.CSSProperties}
                      />
                      <span>{fixture.teams.home.name}</span>
                    </div>
                - : -
                    <div className="team">
                      <img
                        src={fixture.teams.away.logo}
                        alt="logo"
                        style={{
                          width: "20px",
                          height: "20px",
                          objectFit: "contain",
                          marginRight: "5px"
                        } as React.CSSProperties}
                      />
                      <span>{fixture.teams.away.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Mecze zakończone</h2>
          <div>
            {isLoadingFinishedFixtures || !finishedFixtures ? (
              <Loader />
            ) : Object.keys(finishedFixtures).reverse().map((round: any) => (
              <div key={round}>
                <h4>{round}</h4>
                {finishedFixtures[round].map((fixture: any) => (
                  <div key={fixture.fixture.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="team">
                      <img
                        src={fixture.teams.home.logo}
                        alt="logo"
                        style={{
                          width: "20px",
                          height: "20px",
                          objectFit: "contain",
                          marginRight: "5px"
                        } as React.CSSProperties}
                      />
                      <span>{fixture.teams.home.name}</span>
                    </div>
                    <div className="score">
                      {fixture.goals.home} : {fixture.goals.away}
                    </div>
                    <div className="team">
                      <img
                        src={fixture.teams.away.logo}
                        alt="logo"
                        style={{
                          width: "20px",
                          height: "20px",
                          objectFit: "contain",
                          marginRight: "5px"
                        } as React.CSSProperties}
                      />
                      <span>{fixture.teams.away.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}