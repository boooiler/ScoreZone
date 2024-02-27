import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFootballFixtures } from "../../api/footballQuery"
import Loader from "@/shared/components/loader"
import './styles.scss'
import { FootballFixtureEvent, FootballMatch } from "../../model/fixtureDetails"
import moment from "moment"
import Icon from "@/shared/icons/Icon"

export const FixtureDetails = () => {
  const { fixtureId } = useParams()
  const navigate = useNavigate()
  const { data: fixture, isLoading } = useFootballFixtures(Number(fixtureId))
  const fixtureDetails: FootballMatch = fixture && fixture[0]
  const [activeTab, setActiveTab] = useState<'events' | 'squads' | 'h2h' | 'standings'>('events')

  useEffect(() => {
    console.log(fixtureDetails)
  }, [fixtureDetails])

  const eventIcon = (eventDetail: string) => {
    if(eventDetail.includes('Substitution')){
      return <Icon name='IconArrowSort' variant="filled" />
    } else if (eventDetail.includes('Yellow Card')){
      return <div style={{ width: "10px", background: "yellow", borderRadius: "2px" }}></div>
    } else if (eventDetail.includes('Red Card')){
      return <div style={{ width: "10px", background: "red", borderRadius: "2px" }}></div>
    } else if (eventDetail.includes('Normal Goal')){
      return <Icon name='IconFootball' variant='filled' />
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
                  <p className="fixture-match-info--date">{moment(fixtureDetails.fixture.date).format("DD/MM/YYYY")}</p>
                  <p className="fixture-match-info--date">{moment(fixtureDetails.fixture.date).format("HH:mm")}</p>
                  <p className="fixture-match-info--stadium">
                    {fixtureDetails.fixture.venue.name}, {fixtureDetails.fixture.venue.city}
                  </p>
                  {/* <p>{fixtureDetails.fixture.status.long}</p> */}
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
                    {/* <p>`{fixtureDetails.fixture.status.elapsed}</p> */}
                    <div className="score">
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
                <p className="fixture-referee">Sędzia: <b>{fixtureDetails.fixture.referee}</b></p>
              </section>
            </section>

            <section className="fixture-details-wrapper">
              <section className="tabs">
                <span 
                  className={`tab ${activeTab === 'events' ? 'active' : ''}`}
                  onClick={() => setActiveTab('events')}
                >
                  Skrót meczu
                </span>
                <span 
                  className={`tab ${activeTab === 'squads' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('squads')}
                >
                Składy
                </span>
                <span 
                  className={`tab ${activeTab === 'h2h' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('h2h')}
                >
                Mecze
                </span>
                <span 
                  className={`tab ${activeTab === 'standings' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('standings')}
                >
                Tabela
                </span>
              </section>

              <section className="tab-content">
                {activeTab === 'events' ? (
                  <section className="match-report">
                    {fixtureDetails.events.map((e: FootballFixtureEvent) => (
                      <div 
                        className={`match-report--item ${e.team.id === fixtureDetails.teams.home.id ? 'home' : 'away'}`}
                      >
                        <div>{e.time.elapsed}{e.time.extra && `+${e.time.extra}`}&#8242;</div> 
                        <div className="match-report--item__icon">{eventIcon(e.detail)}</div> 
                        <div>{e.player.name} <span>{e.assist.name && `(${e.assist.name})`}</span></div>
                      </div>
                    ))}
                  </section>
                ) : (
                  <></>
                )}
              </section>
            </section>
          </>
        )}
      </section>
    </>
  )
}

export default FixtureDetails