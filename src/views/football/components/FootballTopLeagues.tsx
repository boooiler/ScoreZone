import { useEffect } from "react"
import { useFootballLeagues } from "../api/footballQuery"
import Loader from "@/shared/components/loader"
import { useLocation, useNavigate } from "react-router-dom"

export const FootballTopLeagues = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { data: leagues, isLoading: isLoadingLeagues } = useFootballLeagues(true, [
    1, // World Cup
    2, // UEFA Champions League
    3, // UEFA Europa League
    848, // UEFA Europa Conference League
    4, // Euro Championship
    960, // Euro Championship - Qualification
    5, // UEFA Nations League
    15, // FIFA Club World Cup
    39, // Premier League
    61, // Ligue 1
    78, // Bundesliga
    106, // Ekstraklasa
    107, // I Liga
    108, // Puchar Polski
    727, // Superpuchar Polski
    135, // Serie A
    140 // La Liga
  ])

  const isActive = (path: string) => {
    if (!pathname) return false
    return pathname.includes(path)
  }

  return (
    <section>
      <h2>Popularne ligi:</h2>
      {isLoadingLeagues ? (
        <Loader />
      ) : leagues && leagues.length > 0 ? (
        <section className="" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {leagues.map((l: any) => {
            console.log(l)
            const { league, country } = l
            return (
              <div 
                className={`league ${isActive(league.id) ? 'active' : ''}`} 
                key={league.id} 
                onClick={() => navigate(`/football/leagues/${league.id}`)}
                style={{ 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <img
                  src={league.logo}
                  alt="logo"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "contain",
                    marginRight: "15px",
                    background: "#fff",
                    padding: "6px",
                    borderRadius: "6px"
                  } as React.CSSProperties}
                />
                <div
                  style={{ 
                    cursor: "pointer"
                  }}
                >
                  <p style={{ margin: 0, fontWeight: "bold" }}>{league.name}</p>
                  <i style={{ fontSize: "12px", color: "#d8d8d8" }}>{country.name}</i>
                </div>
              </div>
            )
          })}
        </section>
      ) : (
        <p>Brak lig lub skończyła się darmowa ilość requestów. Spróbuj ponownie jutro. Przepraszamy za utrudnienia.</p>
      )}
    </section>
  )
}

export default FootballTopLeagues