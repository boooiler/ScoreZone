import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useFootballLeagues, useFootballSquads, useFootballTeams } from "../../api/footballQuery"
import Loader from "@/shared/components/loader"
import { FootballTeam } from "../../model/team"
import { FootballStandings } from "../../components/footballStandings/FootballStandings"
import { FootballFixtures } from "../../components/footballFixtures/FootballFixtures"
import { TeamBox } from "@/shared/components/teamBox"
import TopLeagues from "@/shared/components/topLeagues"
import './styles.scss'

export const TeamDetails = () => {
  const { teamId } = useParams()
  const { t } = useTranslation()
  const { data, isLoading } = useFootballTeams(Number(teamId))
  const { data: leagueDetails, isLoading: isLoadingLeague } = useFootballLeagues(true, undefined, undefined, undefined, undefined, undefined, Number(teamId), "league")
  const { data: squad, isLoading: isLoadingSquad } = useFootballSquads(Number(teamId))
  const [teamDetails, setTeamDetails] = useState<FootballTeam>()
  const [activeTab, setActiveTab] = useState<'squad' | 'standings' | 'plannedFixtures' | 'finishedFixtures'>('squad')

  useEffect(() => {
    if(data && data.response){
      setTeamDetails(data.response[0])
    }
  }, [data])

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues sport="football" leagueIds={[39, 78, 106, 107, 135, 140]} />
      </section>
      <section className="page-wrapper football-team-details">
        {isLoading || !teamDetails || !leagueDetails || !leagueDetails.length ? (
          <Loader fullscreen />
        ) : (
          <>
            <section className="team-details-header">
              <div className="team-details-header--bg-image">
                <img
                  src={teamDetails.venue.image}
                  alt="logo"
                  className="team-logo"
                />
              </div>
              <div className="team-details-header--left">
                <img
                  src={teamDetails.team.logo}
                  alt="logo"
                  className="team-logo"
                />
                <h1 className="team-name">{teamDetails.team.name}</h1>
                <div className="team-info-wrapper">
                  <div className="team-info">
                    <span>{t('shared.foundationYear')}</span>
                    <h4>{teamDetails.team.founded}</h4>
                  </div>
                  <div className="team-info">
                    <span>{t('shared.country')}</span>
                    <h4>{teamDetails.team.country}</h4>
                  </div>
                </div>
              </div>

              <div className="team-details-header--right">
                <div className="team-info-wrapper">
                  <div className="team-info fluid">
                    <span>{t('shared.stadium')}</span>
                    <h4>{teamDetails.venue.name}</h4>
                  </div>
                  <div className="team-info">
                    <span>{t('shared.capacity')}</span>
                    <h4>{teamDetails.venue.capacity}</h4>
                  </div>
                  <div className="team-info">
                    <span>{t('shared.city')}</span>
                    <h4>{teamDetails.venue.city}</h4>
                  </div>
                  <div className="team-info">
                    <span>{t('shared.address')}</span>
                    <h4>{teamDetails.venue.address}</h4>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="tabs">
              <span 
                className={`tab ${activeTab === 'squad' ? 'active' : ''}`}
                onClick={() => setActiveTab('squad')}
              >
                {t('shared.table.team')}
              </span>
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
            </section>

            {activeTab === 'squad' ? (
              <section className="squad">
                {isLoadingSquad || !squad ? (
                  <Loader />
                ) : (
                  squad[0].players.map((p:any) => (
                    <TeamBox 
                      sport="football"
                      id={p.id} 
                      name={p.name} 
                      photo={p.photo} 
                      number={p.number}
                      position={p.position}
                      age={p.age}
                      isClickable={false} 
                    />
                  ))
                )}
              </section>
            ) : activeTab === 'standings' ? (
              <FootballStandings league={leagueDetails[0].league.id} season={leagueDetails[0].seasons[leagueDetails[0].seasons.length - 1].year} />
            ) : activeTab === "plannedFixtures" ? (
              <section className="fixtures">
                <FootballFixtures 
                  fixturesType="planned" 
                  league={leagueDetails[0].league.id} 
                  season={leagueDetails[0].seasons[leagueDetails[0].seasons.length - 1].year} 
                  team={Number(teamId)} 
                />
              </section>
            ) : (
              <section className="fixtures">
                <FootballFixtures 
                  fixturesType="finished" 
                  league={leagueDetails[0].league.id} 
                  season={leagueDetails[0].seasons[leagueDetails[0].seasons.length - 1].year} 
                  team={Number(teamId)} 
                />
              </section>
            )}

          </>
        )}
      </section>
    </>
  )
}

export default TeamDetails