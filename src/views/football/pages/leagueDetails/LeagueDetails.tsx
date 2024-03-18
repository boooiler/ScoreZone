import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { useFootballLeagues, useFootballTeams } from "../../api/footballQuery"
import { FootballFixtures } from "../../components/footballFixtures/FootballFixtures"
import { FootballStandings } from "../../components/footballStandings/FootballStandings"
import { FootballLeague } from "../../model/league"
import Loader from "@/shared/components/loader"
import { TeamBox } from "@/shared/components/teamBox"
import TopLeagues from "@/shared/components/topLeagues"

import './styles.scss'

export const LeagueDetails = () => {
  const { leagueId } = useParams()
  const { t } = useTranslation()
  const { data: leagueDetails, isLoading: isLoadingLeague } = useFootballLeagues(undefined, [Number(leagueId)])
  const [leagueInfo, setLeagueInfo] = useState<FootballLeague | undefined>()
  const [activeTab, setActiveTab] = useState<'standings' | 'plannedFixtures' | 'finishedFixtures' | 'teams'>('standings')
  
  useEffect(() => {
    if(leagueDetails){
      setLeagueInfo(leagueDetails[0])
    }
  }, [leagueDetails])
  
  const { data: teams, isLoading: isLoadingTeams } = useFootballTeams(undefined, leagueInfo && leagueInfo.seasons[leagueInfo.seasons.length - 1].year, Number(leagueId))

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues sport="football" leagueIds={[39, 78, 106, 107, 135, 140]} />
      </section>
      <section className="page-wrapper football-league-details">
        {isLoadingTeams || isLoadingLeague || !leagueInfo || !teams ? (
          <Loader fullscreen />
        ) : (
          <>
            <section className="league-details-header">
              <div className="league-details-header--top">
                <img
                  src={leagueInfo.league.logo}
                  alt="logo"
                  className="league-logo"
                />
                <h1 className="league-name">{leagueInfo.league.name}</h1>
              </div>

              <div className="league-details-header--bottom">
                <div className="league-info">
                  <span>{t('shared.season')}</span>
                  <h4>
                    {leagueInfo.seasons[leagueInfo.seasons.length - 1].year}
                  /
                    {leagueInfo.seasons[leagueInfo.seasons.length - 1].year + 1}
                  </h4>
                </div>
                <div className="league-info">
                  <span>{t('shared.country')}</span>
                  <h4>{leagueInfo.country.name}</h4>
                </div>
                <div className="league-info">
                  <span>{t('shared.teams')}</span>
                  <h4>{teams.response.length}</h4>
                </div>
              </div>
            </section>

            {/* <section className="live-fixtures-wrapper">
              <div className="live-fixture-item">
                <div className="live-fixture-item--top">
                  <span className="live-fixture-item--top__time">`13</span>
                  <div className="live-fixture-item--top__teams">
                    <img src="" alt="" />
                    <img src="" alt="" />
                  </div>
                </div>
                <div className="live-fixture-item--middle">
                  <div className="live-fixture-item--middle__line">
                    <div className="line-dot" style={{ left: `${13/90*100 > 90 ? 100 : 13/90*100}%` }}></div>
                  </div>
                </div>
                <div className="live-fixture-item--bottom">
                  <span className="live-fixture-item--bottom__live">LIVE</span>
                  <div className="team winner">
                    <span>Wisła Kraków</span>
                    <span className="score">2</span>
                  </div>
                  <div className="team lost">
                    <span>Cracovia</span>
                    <span className="score">0</span>
                  </div>
                </div>
              </div>
              <div className="live-fixture-item">
                <div className="live-fixture-item--top">
                  <span className="live-fixture-item--top__time">`58</span>
                  <div className="live-fixture-item--top__teams">
                    <img src="" alt="" />
                    <img src="" alt="" />
                  </div>
                </div>
                <div className="live-fixture-item--middle">
                  <div className="live-fixture-item--middle__line">
                    <div className="line-dot" style={{ left: `${58/90*100 > 90 ? 100 : 58/90*100}%` }}></div>
                  </div>
                </div>
                <div className="live-fixture-item--bottom">
                  <span className="live-fixture-item--bottom__live">LIVE</span>
                  <div className="team">
                    <span>Legia Warszawa</span>
                    <span className="score">0</span>
                  </div>
                  <div className="team">
                    <span>Lech Poznań</span>
                    <span className="score">0</span>
                  </div>
                </div>
              </div>
            </section> */}

            <section className="tabs">
              <span 
                className={`tab ${activeTab === 'standings' ? 'active' : ''}`}
                onClick={() => setActiveTab('standings')}
              >
                {t('shared.standings')}
              </span>
              <span 
                className={`tab ${activeTab === 'finishedFixtures' ? 'active' : ''}`} 
                onClick={() => setActiveTab('finishedFixtures')}
              >
                {t('shared.results')}
              </span>
              <span 
                className={`tab ${activeTab === 'plannedFixtures' ? 'active' : ''}`} 
                onClick={() => setActiveTab('plannedFixtures')}
              >
                {t('shared.matches')}
              </span>
              <span 
                className={`tab ${activeTab === 'teams' ? 'active' : ''}`} 
                onClick={() => setActiveTab('teams')}
              >
                {t('shared.teams')}
              </span>
            </section>

            {activeTab === 'standings' ? (
              <FootballStandings league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].year} />
            ) : activeTab === "plannedFixtures" ? (
              <section className="fixtures">
                <FootballFixtures fixturesType="planned" league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].year} />
              </section>
            ) : activeTab === "finishedFixtures" ? (
              <section className="fixtures">
                <FootballFixtures fixturesType="finished" league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].year} />
              </section>
            ) : (
              <section className="teams">
                {teams.response && teams.response.map((t: any) => {
                  const { team } = t
                  return <TeamBox sport="football" key={team.id} id={team.id} name={team.name} photo={team.logo} />
                })}
              </section>
            )}
          </>
        )}
      </section>
    </>
  )
}

export default LeagueDetails