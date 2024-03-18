import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import moment from "moment"
import { useFootballFixtures } from "../api/footballQuery"
import TopLeagues from "@/shared/components/topLeagues"
import Loader from "@/shared/components/loader"
import { FootballFixture } from "../model/fixtures"
import '../components/footballFixtures/styles.scss'
import './styles.scss'
import { SportPage } from "@/shared/components/sportPage"

export const Football = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()  
  const { data: fixturesData, isLoading } = useFootballFixtures(undefined, undefined, 2023, undefined, undefined, undefined, undefined, moment().format('YYYY-MM-DD'))
  const leagueIds = [2, 3, 848, 39, 78, 106, 107, 135, 140]
  const liveStatus = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'INT']
  const breakStatus = ['HT', 'BT', 'INT']
  const [fixtures, setFixtures] = useState<any>()

  useEffect(() => {
    if(fixturesData){
      setFixtures(groupFixtures(fixturesData))
      console.log(groupFixtures(fixturesData))
    }
  }, [fixturesData])

  const groupFixtures = (fixtures: FootballFixture[]) => {
    const filteredFixtures = fixtures.filter((item: FootballFixture) => leagueIds.includes(item.league.id))
    const groupedFixtures = filteredFixtures.reduce((acc: any, fixture: FootballFixture) => {
      const { name } = fixture.league
      if (!acc[name]) {
        acc[name] = []
      }
      acc[name].push(fixture)
      return acc
    }, {})
    return groupedFixtures
  }

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues sport="football" leagueIds={[39, 78, 106, 107, 135, 140]} />
      </section>
      <section className="page-wrapper">
        <h1>{t('root.menu.football')}</h1>
        <section className="football-main-page">
          {isLoading ?(
            <Loader fullscreen />
          ) : !fixtures || !Object.keys(fixtures).length ? (
            <SportPage />
          ) : (
            <>
              <h2>{t('shared.todaysMatches')}</h2>
              {Object.keys(fixtures).map((leagueName: string, index: number) => (
                <div key={index} className="fixtures-wrapper--round">
                  <h4>{leagueName}</h4>
                  {fixtures[leagueName].map((fixture: FootballFixture) => (
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
                        ) : fixture.fixture.status.short === 'FT' ? (
                          <b style={{ fontSize: '12px' }}>{t('shared.finished')}</b>
                        ) : fixture.fixture.status.short === 'PST' ? (
                          <b style={{ fontSize: '12px' }}>{t('shared.postponed')}</b>
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
            </>
          )}
        </section>
      </section>
    </>
  )
}

export default Football