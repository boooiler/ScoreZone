import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"

import { useFootballFixtures } from "../../api/footballQuery"
import { FootballLineups } from "../../components/footballLineups/FootballLineups"
import { FootballStandings } from "../../components/footballStandings/FootballStandings"
import { FootballFixtureEvent, FootballMatch } from "../../model/fixtureDetails"
import Loader from "@/shared/components/loader"
import { Tab, TabGroup } from "@/shared/components/tabs"
import Icon from "@/shared/icons/Icon"

import './styles.scss'

export const FixtureDetails = () => {
  const { fixtureId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data: fixture, isLoading } = useFootballFixtures(Number(fixtureId))
  const fixtureDetails: FootballMatch = fixture && fixture[0]
  const liveStatus = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'INT']
  const breakStatus = ['HT', 'BT', 'INT']
  const goalEvent = [
    'Normal Goal',
    'Penalty'
  ]
  const varEvent = [
    'Goal Disallowed - offside',
    'Penalty confirmed'
  ]

  const eventIcon = (eventDetail: string) => {
    if(eventDetail.includes('Substitution')){
      return <Icon name='IconArrowSort' variant="filled" />
    } else if (eventDetail.includes('Yellow Card')){
      return <div style={{ width: "10px", background: "yellow", borderRadius: "2px" }}></div>
    } else if (eventDetail.includes('Red Card')){
      return <div style={{ width: "10px", background: "red", borderRadius: "2px" }}></div>
    } else if(eventDetail.includes('Own Goal')){
      return <Icon name='IconFootball' variant="outlined" />
    } else if (goalEvent.includes(eventDetail)){
      return <Icon name='IconFootball' variant='filled' />
    } else if (eventDetail.includes('Missed Penalty')){
      return <div style={{ width: "8px", fontSize: "12px" }}>X</div>
    } else if (varEvent.includes(eventDetail)){
      return <div style={{ width: "15px", fontSize: "8px" }}>VAR</div>
    } 
    return '' 
  }

  return (
    <>
      <section className="page-wrapper football-fixture-details">
        {isLoading || !fixtureDetails ? (
          <Loader fullscreen />
        ) : (
          <>
            <section className="fixture-details-header">
              <section className="fixture-details-header--top">
                <div 
                  className="fixture-league"
                  onClick={() => navigate(`/football/leagues/${fixtureDetails.league.id}`)}
                >
                  <img src={fixtureDetails.league.logo} alt="logo" />
                  <p>{fixtureDetails.league.name}</p>
                </div>
                <p className="fixture-round">{fixtureDetails.league.round}</p>
              </section>
              <section className="fixture-details-header--bottom">
                <div className="fixture-match-info">
                  {liveStatus.includes(fixtureDetails.fixture.status.short) ? (
                    <div className="live-match">
                      {breakStatus.includes(fixtureDetails.fixture.status.short) 
                        ? <b style={{ fontSize: '12px' }}>{t('shared.break')}</b> 
                        : <b>{fixtureDetails.fixture.status.elapsed}<div>&#8242;</div></b>}
                    </div>
                  ) : (
                    <>
                      {fixtureDetails.fixture.status.short === 'PST' ? (
                        <p className="fixture-match-info--date">{t('shared.matchPostponed')}</p>
                      ) : (
                        <>
                          <p className="fixture-match-info--date">{moment(fixtureDetails.fixture.date).format("DD/MM/YYYY")}</p>
                          <p className="fixture-match-info--date">{moment(fixtureDetails.fixture.date).format("HH:mm")}</p>
                        </>
                      )}
                      <p className="fixture-match-info--stadium">
                        {fixtureDetails.fixture.venue.name}, {fixtureDetails.fixture.venue.city}
                      </p>
                    </>
                  )}
                </div>
                <div className="fixture-summary">
                  <div 
                    className="fixture-summary--team fixture-summary--team__home"
                    onClick={() => navigate(`/football/teams/${fixtureDetails.teams.home.id}`)}
                  >
                    <p>{fixtureDetails.teams.home.name}</p>
                    <img src={fixtureDetails.teams.home.logo} alt="logo" />
                  </div>
                  <div className="fixture-summary--result">
                    <div className="score" style={{ color: liveStatus.concat(breakStatus).includes(fixtureDetails.fixture.status.short) ? 'var(--main-color)' : 'inherit' }}>
                      <div className="score--item">
                        {fixtureDetails.goals.home}
                      </div>
                      <span>:</span>
                      <div className="score--item">
                        {fixtureDetails.goals.away}
                      </div>
                    </div>
                  </div>
                  <div 
                    className="fixture-summary--team fixture-summary--team__away"
                    onClick={() => navigate(`/football/teams/${fixtureDetails.teams.away.id}`)}
                  >
                    <img src={fixtureDetails.teams.away.logo} alt="logo" />
                    <p>{fixtureDetails.teams.away.name}</p>
                  </div>
                </div>
                <p className="fixture-referee">{t('shared.referee')}: <b>{fixtureDetails.fixture.referee}</b></p>
              </section>
            </section>

            <section className="fixture-details-wrapper">
              <TabGroup>
                <Tab label={t('shared.highlights')}>
                  <section className="match-report">
                    {fixtureDetails.events.map((e: FootballFixtureEvent, index: number) => (
                      <div 
                        key={index}
                        className={`match-report--item ${e.team.id === fixtureDetails.teams.home.id ? 'home' : 'away'}`}
                      >
                        <div>{e.time.elapsed}{e.time.extra && `+${e.time.extra}`}&#8242;</div> 
                        <div className="match-report--item__icon">{eventIcon(e.detail)}</div> 
                        <div>{e.player.name} <span>{e.assist.name && `(${e.assist.name})`}</span></div>
                      </div>
                    ))}
                  </section>
                </Tab>
                <Tab label={t('shared.lineups')}>
                  {fixtureId && <FootballLineups fixtureId={fixtureId} />}
                </Tab>
                <Tab label={t('shared.standings')}>
                  <FootballStandings league={fixtureDetails.league.id} season={fixtureDetails.league.season} />
                </Tab>
              </TabGroup>
            </section>
          </>
        )}
      </section>
    </>
  )
}

export default FixtureDetails