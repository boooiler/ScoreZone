import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { VolleyballFixtures } from "../../components/volleyballFixtures/VolleyballFixtures"
import { Team } from "../../model/team"
import { useTeams } from "@/shared/api/sportQuery"
import Loader from "@/shared/components/loader"
import TopLeagues from "@/shared/components/topLeagues"

import './styles.scss'

interface Props {
  sport: "volleyball" | "handball"
}
export const TeamDetails = ({ sport }: Props) => {
  const { t } = useTranslation()
  const { teamId } = useParams()
  const { data, isLoading } = useTeams(sport, Number(teamId))
  const [teamDetails, setTeamDetails] = useState<Team>()
  const [activeTab, setActiveTab] = useState<'plannedFixtures' | 'finishedFixtures'>('finishedFixtures')

  useEffect(() => {
    if(data && data.response){
      setTeamDetails(data.response[0])
    }
  }, [data])

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues leagueIds={sport === 'volleyball' ? [97, 113, 120] : [78, 82, 39, 103]} sport={sport} />
      </section>
      <section className="page-wrapper team-details">
        {isLoading || !teamDetails 
          ? (
            <Loader fullscreen />
          ) : (
            <>
              <section className="team-details-header">
                <div className="team-country">
                  <img
                    src={teamDetails.country.flag}
                    alt="country flag"
                    className="country-flag"
                  />
                  <p>{teamDetails.country.name}</p>
                </div>
                <img
                  src={teamDetails.logo}
                  alt="logo"
                  className="team-logo"
                />
                <h1 className="team-name">{teamDetails.name}</h1>
              </section>
            
              <section className="tabs">
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

              { activeTab === "plannedFixtures" ? (
                <section className="fixtures">
                  <VolleyballFixtures 
                    fixturesType="planned"
                    season={2023}
                    team={Number(teamId)} 
                    sport={sport}
                  />
                </section>
              ) : (
                <section className="fixtures">
                  <VolleyballFixtures 
                    fixturesType="finished"
                    season={2023}
                    team={Number(teamId)} 
                    sport={sport}
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