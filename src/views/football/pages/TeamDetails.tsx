import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useFootballTeams } from "../api/footballQuery"
import Loader from "@/shared/components/loader"
import { FootballTeam } from "../model/team"
import './styles.scss'

export const TeamDetails = () => {
  const { teamId } = useParams()
  const { data, isLoading } = useFootballTeams(Number(teamId))
  const [teamDetails, setTeamDetails] = useState<FootballTeam>()

  useEffect(() => {
    if(data && data.response){
      setTeamDetails(data.response[0])
    }
  }, [data])

  return (
    <>
      <section className="page-wrapper football-team-details">
        {isLoading || !teamDetails ? (
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
              <div className="team-details-header--top">
                <img
                  src={teamDetails.team.logo}
                  alt="logo"
                  className="team-logo"
                />
                
                <h1 className="team-name">{teamDetails.team.name}</h1>
              </div>
            </section>

          </>
        )}
      </section>
    </>
  )
}

export default TeamDetails