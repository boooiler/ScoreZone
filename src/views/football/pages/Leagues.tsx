import { useEffect } from "react"
import { useFootballCountries, useFootballLeagues, useFootballTeams } from "../api/footballQuery"
import './styles.scss'
import { useParams } from "react-router-dom"

export const Leagues = () => {
  const { leagueId } = useParams()
  const { data: leagueDetails, isLoading: isLoadingLeague } = useFootballLeagues(undefined, [Number(leagueId)])
  const { data: teams, isLoading: isLoadingTeams } = useFootballTeams(undefined, Number(leagueId), 2023)

  useEffect(() => {
    console.log(teams)
  }, [teams])

  return (
    <div>
      {isLoadingTeams || !leagueDetails ? (
        <p>loading...</p>
      ) : (
        <>
          <h1>{leagueDetails[0].name}</h1>
          {teams.response && teams.response.map((t: any) => {
            const { team } = t
            team.name
            return <div className="team" key={team.id}>
              <img
                src={team.logo}
                alt="logo"
                style={
                {
                  width: "30px",
                  height: "30px",
                  objectFit: "contain",
                  marginRight: "15px"
                } as React.CSSProperties
                }
              />
              <span>{team.name}</span>
            </div>
          })}
        </>
      )}
    </div>
  )
}

export default Leagues