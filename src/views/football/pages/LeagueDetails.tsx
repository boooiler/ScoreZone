import { useEffect, useState } from "react"
import { useFootballCountries, useFootballLeagues, useFootballTeams } from "../api/footballQuery"
import './styles.scss'
import { useParams } from "react-router-dom"
import FootballTopLeagues from "../components/FootballTopLeagues"
import { FootballStandings } from "../components/FootballStandings"

export const LeagueDetails = () => {
  const { leagueId } = useParams()
  const { data: leagueDetails, isLoading: isLoadingLeague } = useFootballLeagues(undefined, [Number(leagueId)])
  const [leagueInfo, setLeagueInfo] = useState<any | undefined>()
  
  useEffect(() => {
    if(leagueDetails){
      // console.log(leagueDetails)
      setLeagueInfo(leagueDetails[0])
    }
  }, [leagueDetails])
  
  const { data: teams, isLoading: isLoadingTeams } = useFootballTeams(undefined, Number(leagueId), leagueInfo && leagueInfo.seasons[leagueInfo.seasons.length - 1].year)

  return (
    <>
      <section className="left-sidebar">
        <FootballTopLeagues />
      </section>
      <section className="page-wrapper">
        {isLoadingTeams || isLoadingLeague || !leagueInfo || !teams ? (
          <p>loading...</p>
        ) : (
          <>
            <h1>{leagueInfo && leagueInfo.league.name}</h1>
            <section className="standings">
              <FootballStandings league={Number(leagueId)} season={leagueInfo && leagueInfo.seasons[leagueInfo.seasons.length - 1].year} />
            </section>
            <section className="teams">
              <h2>Drużyny</h2>
              {teams.response && teams.response.map((t: any) => {
                const { team } = t
                team.name
                return <div className="team" key={team.id}>
                  <img
                    src={team.logo}
                    alt="logo"
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "contain",
                      marginRight: "15px"
                    } as React.CSSProperties}
                  />
                  <span>{team.name}</span>
                </div>
              })}
            </section>
          </>
        )}
      </section>
    </>
  )
}

export default LeagueDetails