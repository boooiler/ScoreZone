import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import { useFootballLeagues, useFootballTeams } from "../../api/footballQuery"
// import FootballTopLeagues from "../../components/footballTopLeagues/FootballTopLeagues"
// import { FootballStandings } from "../../components/footballStandings/FootballStandings"
// import { FootballFixtures } from "../../components/footballFixtures/FootballFixtures"
import Loader from "@/shared/components/loader"
// import { FootballLeague } from "../../model/league"
import './styles.scss'
import { TeamBox } from "@/shared/components/teamBox"
import { useVolleyballLeagues, useVolleyballTeams } from "../../api/volleyballQuery"
import TopLeagues from "@/shared/components/topLeagues"
import { FootballLeague } from "@/views/football/model/league"
import { VolleyballStandings } from "../../components/volleyballStandings/VolleyballStandings"
import { VolleyballLeagueInfo } from "../../model/league"
import { VolleyballFixtures } from "../../components/volleyballFixtures/VolleyballFixtures"

interface Props {
  sport: "volleyball" | "handball"
}
export const LeagueDetails = ({ sport }: Props) => {
  const { leagueId } = useParams()
  const { data: leagueDetails, isLoading: isLoadingLeague } = useVolleyballLeagues(sport, Number(leagueId))
  const [leagueInfo, setLeagueInfo] = useState<VolleyballLeagueInfo | undefined>()
  const [activeTab, setActiveTab] = useState<'standings' | 'plannedFixtures' | 'finishedFixtures' | 'teams'>('standings')
  
  useEffect(() => {
    if(leagueDetails){
      setLeagueInfo(leagueDetails[0])
    }
  }, [leagueDetails])
  
  const { data: teams, isLoading: isLoadingTeams } = useVolleyballTeams(sport, undefined, leagueInfo && leagueInfo.seasons[leagueInfo.seasons.length - 1].season, Number(leagueId))

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues leagueIds={sport === 'volleyball' ? [97, 113, 120] : [127, 81, 82, 39, 103]} sport={sport} />
      </section>
      <section className="page-wrapper football-league-details">
        {isLoadingTeams || isLoadingLeague || !leagueInfo || !teams ? (
          <Loader fullscreen />
        ) : (
          <>
            <section className="league-details-header">
              <div className="league-details-header--top">
                <img
                  src={leagueInfo.logo}
                  alt="logo"
                  className="league-logo"
                />
                <h1 className="league-name">{leagueInfo.name}</h1>
              </div>

              <div className="league-details-header--bottom">
                <div className="league-info">
                  <span>Season</span>
                  <h4>
                    {leagueInfo.seasons[leagueInfo.seasons.length - 1].season}
                  /
                    {leagueInfo.seasons[leagueInfo.seasons.length - 1].season + 1}
                  </h4>
                </div>
                <div className="league-info">
                  <span>Country</span>
                  <h4>{leagueInfo.country.name}</h4>
                </div>
                <div className="league-info">
                  <span>Teams</span>
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
                  Tabela
              </span>
              <span 
                className={`tab ${activeTab === 'finishedFixtures' ? 'active' : ''}`} 
                onClick={() => setActiveTab('finishedFixtures')}
              >
                Wyniki
              </span>
              <span 
                className={`tab ${activeTab === 'plannedFixtures' ? 'active' : ''}`} 
                onClick={() => setActiveTab('plannedFixtures')}
              >
                Mecze
              </span>
              <span 
                className={`tab ${activeTab === 'teams' ? 'active' : ''}`} 
                onClick={() => setActiveTab('teams')}
              >
                Drużyny
              </span>
            </section>

            {activeTab === 'standings' ? (
              <VolleyballStandings sport={sport} league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].season} />
            ) : activeTab === "plannedFixtures" ? (
              <section className="fixtures">
                <VolleyballFixtures sport={sport} fixturesType="planned" league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].season} />
              </section>
            ) : activeTab === "finishedFixtures" ? (
              <section className="fixtures">
                <VolleyballFixtures sport={sport} fixturesType="finished" league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].season} />
              </section>
            ) : (
              <section className="teams">
                {teams.response && teams.response.map((t: any) => {
                  return <TeamBox id={t.id} name={t.name} photo={t.logo} />
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