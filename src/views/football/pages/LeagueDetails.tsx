import { useEffect, useState } from "react"
import { useFootballCountries, useFootballLeagues, useFootballTeams } from "../api/footballQuery"
import './styles.scss'
import { useParams } from "react-router-dom"
import FootballTopLeagues from "../components/FootballTopLeagues"

export const LeagueDetails = () => {
  const { leagueId } = useParams()
  const { data: leagueDetails, isLoading: isLoadingLeague } = useFootballLeagues(undefined, [Number(leagueId)])
  const { data: teams, isLoading: isLoadingTeams } = useFootballTeams(undefined, Number(leagueId), 2023)
  const [leagueInfo, setLeagueInfo] = useState<any | undefined>()

  useEffect(() => {
    if(leagueDetails){
      console.log(leagueDetails)
      setLeagueInfo(leagueDetails[0])
    }
  }, [leagueDetails])

  return (
    <>
      <section className="left-sidebar">
        <FootballTopLeagues />
      </section>
      <section className="page-wrapper">
        <h1>Piłka nożna</h1>
        {isLoadingTeams || isLoadingLeague ? (
          <p>loading...</p>
        ) : (
          <>
            <h1>{leagueInfo && leagueInfo.league.name}</h1>
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
      </section>
    </>
  )
}

export default LeagueDetails