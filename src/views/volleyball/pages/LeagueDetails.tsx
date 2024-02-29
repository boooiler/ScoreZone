import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import { useFootballCountries, useFootballLeagues, useFootballTeams } from "../api/footballQuery"
// import FootballTopLeagues from "../components/FootballTopLeagues"
// import { FootballStandings } from "../components/FootballStandings"
// import { FootballFixtures } from "../components/FootballFixtures"
// import { FootballLeague } from "../model/football"
import './styles.scss'

export const LeagueDetails = () => {
  const { leagueId } = useParams()
  // const { data: leagueDetails, isLoading: isLoadingLeague } = useFootballLeagues(undefined, [Number(leagueId)])
  // const [leagueInfo, setLeagueInfo] = useState<FootballLeague | undefined>()
  const [activeTab, setActiveTab] = useState<'standings' | 'plannedFixtures' | 'finishedFixtures' | 'teams'>('standings')
  
  // useEffect(() => {
  //   if(leagueDetails){
  //     setLeagueInfo(leagueDetails[0])
  //   }
  // }, [leagueDetails])
  
  // const { data: teams, isLoading: isLoadingTeams } = useFootballTeams(undefined, Number(leagueId), leagueInfo && leagueInfo.seasons[leagueInfo.seasons.length - 1].year)

  return (
    <>
      {/* <section className="left-sidebar">
        <FootballTopLeagues />
      </section>
      <section className="page-wrapper" style={{ padding: 0, position: "relative" }}>
        {isLoadingTeams || isLoadingLeague || !leagueInfo || !teams ? (
          <p>loading...</p>
        ) : (
          <>
            <div
              style={{ 
                position: "absolute",
                inset: "0",
                width: "100%",
                height: "100%",
                backgroundImage: 'url("/images/league-background.svg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: ".05",
                pointerEvents: "none"
                // background: "linear-gradient(rgba(255, 255, 255, 00) 10%,rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)" 
              }}
            ></div>
            <section 
              className="header" 
              style={{ 
                padding: "80px 20px 40px",
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                gap: "40px",
                position: "relative"
                // background: "linear-gradient(rgba(255, 255, 255, 00) 10%,rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)" 
              }}
            >
              <div style={{ flex: 1, position: 'relative', textAlign: "center" }}>
                <img
                  src={leagueInfo.league.logo}
                  alt="logo"
                  style={{
                    width: "100px",
                    height: "100px",
                    // filter: "brightness(0) invert(1)",
                    // opacity: ".2"
                    objectFit: "contain",
                    background: "#fff",
                    padding: "10px",
                    borderRadius: "6px"
                  } as React.CSSProperties}
                />
                <h1 style={{ margin: 0, fontWeight: "900", fontSize: "100px", color: "#5e6167" }}>{leagueInfo.league.name}</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "20px 0",
                  backdropFilter: "blur(6px)",
                  background: "#eaeaea08",
                  borderRadius: "6px"
                }}
              >
                <div style={{ width: "50%", height: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontWeight: 900, fontSize: "20px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 400, textTransform: "uppercase", marginBottom: "4px", opacity: ".6" }}>Season</span>
                  <h4 style={{ margin: 0 }}>
                    {leagueInfo.seasons[leagueInfo.seasons.length - 1].year}
                  /
                    {leagueInfo.seasons[leagueInfo.seasons.length - 1].year + 1}
                  </h4>
                </div>
                <div style={{ width: "50%", height: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontWeight: 900, fontSize: "20px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 400, textTransform: "uppercase", marginBottom: "4px", opacity: ".6" }}>Country</span>
                  <h4 style={{ margin: 0 }}>
                    {leagueInfo.country.name}
                  </h4>
                </div>
                <div style={{ width: "50%", height: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontWeight: 900, fontSize: "20px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 400, textTransform: "uppercase", marginBottom: "4px", opacity: ".6" }}>Teams</span>
                  <h4 style={{ margin: 0 }}>
                    {teams.response.length}
                  </h4>
                </div>
              </div>
            </section>
            <section className="tabs" 
              style={{ position: "relative", display: "flex", justifyContent: "center", gap: "10px", padding: "20px" }}
            >
              <span 
                style={{ cursor: "pointer", padding: "10px 16px", background: "#30343c", borderRadius: "6px" }}
                onClick={() => setActiveTab('standings')}
              >
                  Tabela
              </span>
              <span 
                style={{ cursor: "pointer", padding: "10px 16px", background: "#30343c", borderRadius: "6px" }} 
                onClick={() => setActiveTab('finishedFixtures')}
              >
                Wyniki
              </span>
              <span 
                style={{ cursor: "pointer", padding: "10px 16px", background: "#30343c", borderRadius: "6px" }} 
                onClick={() => setActiveTab('plannedFixtures')}
              >
                Mecze
              </span>
              <span 
                style={{ cursor: "pointer", padding: "10px 16px", background: "#30343c", borderRadius: "6px" }} 
                onClick={() => setActiveTab('teams')}
              >
                Drużyny
              </span>
            </section>
            {activeTab === 'standings' ? (
              <section className="standings" 
                style={{ 
                  padding: "20px 20px",
                  position: "relative"
                  // background: "rgba(255, 255, 255, 0.1)" 
                }}
              >
                <FootballStandings league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].year} />
              </section>
            ) : activeTab === "plannedFixtures" ? (
              <section className="fixtures" 
                style={{ 
                  position: "relative"
                // background: "rgba(255, 255, 255, 0.1)" 
                }}
              >
                <FootballFixtures fixturesType="planned" league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].year} />
              </section>
            ) : activeTab === "finishedFixtures" ? (
              <section className="fixtures" 
                style={{ 
                  position: "relative"
                // background: "rgba(255, 255, 255, 0.1)" 
                }}
              >
                <FootballFixtures fixturesType="finished" league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].year} />
              </section>
            ) : (
              <section className="teams" 
                style={{ 
                  position: "relative"
                // background: "rgba(255, 255, 255, 0.1)" 
                }}
              >
                <h2 style={{ marginTop: 0 }}>Drużyny</h2>
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
            )}
          </>
        )}
      </section> */}
    </>
  )
}

export default LeagueDetails