import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import moment from "moment"

import { useFootballFixtures } from "../../api/footballQuery"
import { FootballFixture, FootballFixtureMatchDay } from "../../model/fixtures"
import Loader from "@/shared/components/loader"

import "./styles.scss"

interface Props {
    league: number
    season: number
    fixturesType: "planned" | "finished"
    team?: number
}
export const FootballFixtures = ({ league, season, fixturesType, team }: Props) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data: fixturesData, isLoading } = useFootballFixtures(undefined, league, season, "TBD-NS-PST-CANC-ABD-AWD", undefined, team)
  const { data: finishedFixturesData, isLoading: isLoadingFinishedFixtures } = useFootballFixtures(undefined, league, season, "FT-AET-PEN-LIVE-WO-1H-HT-2H-ET-BT-P-INT-HT-BT-INT", undefined, team)
  const [fixtures, setFixtures] = useState<FootballFixtureMatchDay>()
  const liveStatus = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'INT']
  const breakStatus = ['HT', 'BT', 'INT']

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
                    {liveStatus.includes(fixture.fixture.status.short) ? (
                      <div className="live-match">
                        {breakStatus.includes(fixture.fixture.status.short) 
                          ? <b style={{ fontSize: '12px' }}>{t('shared.break')}</b> 
                          : <b>{fixture.fixture.status.elapsed}<div>&#8242;</div></b>}
                      </div>
                    ) : (
                      <>
                        <b>{moment(fixture.fixture.date).format("HH:mm")}</b>
                        <p>{moment(fixture.fixture.date).format("DD/MM/YY")}</p>
                      </>
                    )}
                  </div>
                  <div className="team">
                    <img
                      src={fixture.teams.home.logo}
                      alt="team logo"
                    />
                    <span>{fixture.teams.home.name}</span>
                  </div>
                  <div className={`score${liveStatus.includes(fixture.fixture.status.short) ? ' live' : ''}`}>
                    {['NS','TBD', 'PST'].includes(fixture.fixture.status.short) ? (
                      <><div>-</div> : <div>-</div></>
                    ) : (
                      <><div>{fixture.goals.home}</div> : <div>{fixture.goals.away}</div></>
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