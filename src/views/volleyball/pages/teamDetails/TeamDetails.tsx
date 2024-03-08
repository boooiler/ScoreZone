import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import { useFootballLeagues, useFootballSquads, useFootballTeams } from "../../api/footballQuery"
import Loader from "@/shared/components/loader"
// import { FootballTeam } from "../../model/team"
// import FootballTopLeagues from "../../components/footballTopLeagues/FootballTopLeagues"
// import { FootballStandings } from "../../components/footballStandings/FootballStandings"
// import { FootballFixtures } from "../../components/footballFixtures/FootballFixtures"
import { TeamBox } from "@/shared/components/teamBox"
import './styles.scss'
import { useVolleyballLeagues, useVolleyballTeams } from "../../api/volleyballQuery"
import TopLeagues from "@/shared/components/topLeagues"
import { FootballTeam } from "@/views/football/model/team"
import { VolleyballStandings } from "../../components/volleyballStandings/VolleyballStandings"
import { VolleyballFixtures } from "../../components/volleyballFixtures/VolleyballFixtures"

interface Props {
  sport: "volleyball" | "handball"
}
export const TeamDetails = ({ sport }: Props) => {
  const { teamId } = useParams()
  const { data, isLoading } = useVolleyballTeams(sport, Number(teamId))
  // const { data: leagueDetails, isLoading: isLoadingLeague } = useVolleyballLeagues(sport, Number(teamId), "league")
  const [teamDetails, setTeamDetails] = useState<FootballTeam>()
  const [activeTab, setActiveTab] = useState<'standings' | 'plannedFixtures' | 'finishedFixtures'>('standings')

  useEffect(() => {
    if(data && data.response){
      setTeamDetails(data.response[0])
    }
  }, [data])

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues leagueIds={[97, 113, 120]} sport="volleyball" />
      </section>
      <section className="page-wrapper football-team-details">
        {isLoading || !teamDetails 
        // || !leagueDetails || !leagueDetails.length 
          ? (
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
                      <span>Rok założenia</span>
                      <h4>{teamDetails.team.founded}</h4>
                    </div>
                    <div className="team-info">
                      <span>Kraj</span>
                      <h4>{teamDetails.team.country}</h4>
                    </div>
                  </div>
                </div>

                <div className="team-details-header--right">
                  <div className="team-info-wrapper">
                    <div className="team-info fluid">
                      <span>Stadion</span>
                      <h4>{teamDetails.venue.name}</h4>
                    </div>
                    <div className="team-info">
                      <span>Pojemność</span>
                      <h4>{teamDetails.venue.capacity}</h4>
                    </div>
                    <div className="team-info">
                      <span>Miasto</span>
                      <h4>{teamDetails.venue.city}</h4>
                    </div>
                    <div className="team-info">
                      <span>Adres</span>
                      <h4>{teamDetails.venue.address}</h4>
                    </div>
                  </div>
                </div>
              </section>
            
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
              </section>

              {/* {activeTab === 'standings' ? (
                <VolleyballStandings league={leagueDetails[0].league.id} season={leagueDetails[0].seasons[leagueDetails[0].seasons.length - 1].year} />
                // <VolleyballStandings league={leagueDetails[0].league.id} season={leagueDetails[0].seasons[leagueDetails[0].seasons.length - 1].year} />
              ) : activeTab === "plannedFixtures" ? (
                <section className="fixtures">
                  <VolleyballFixtures 
                    fixturesType="planned" 
                    league={leagueDetails[0].league.id} 
                    season={leagueDetails[0].seasons[leagueDetails[0].seasons.length - 1].year} 
                    team={Number(teamId)} 
                  />
                </section>
              ) : (
                <section className="fixtures">
                  <VolleyballFixtures 
                    fixturesType="finished" 
                    league={leagueDetails[0].league.id} 
                    season={leagueDetails[0].seasons[leagueDetails[0].seasons.length - 1].year} 
                    team={Number(teamId)} 
                  />
                </section>
              )} */}

            </>
          )}
      </section>
    </>
  )
}

export default TeamDetails