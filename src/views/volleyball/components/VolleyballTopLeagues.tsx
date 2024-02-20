import { useEffect } from "react"
import Loader from "@/shared/components/loader"
import { useLocation, useNavigate } from "react-router-dom"
import { useVolleyballLeagues } from "../api/volleyballQuery"

export const VolleyballTopLeagues = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { data: leagues, isLoading: isLoadingLeagues } = useVolleyballLeagues([
    97 // SuperLega IT
    // 113 // PlusLiga
    // 114 // Super Cup
    // 116, // Polish Cup
    // 183, // Nations League
    // 185, // World Championship
    // 188, // World Cup
    // 189, // Olympic Games
    // 244, // European Championships
    // 248 // Champions League
    // 184, // Nations League Women
    // 186, // World Championship Women
    // 187, // World Cup Women
    // 190, // Olympic Games Women
    // 245 // European Championships Women
  ], 2023)

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

export default VolleyballTopLeagues