import { useLocation, useNavigate } from "react-router-dom"
import { topVolleyballLeagues } from "@/views/volleyball/model/mockupLeagues"
import { topHandballLeagues } from "@/views/handball/model/mockupLeagues"
import { League } from "@/shared/model/league"

interface TopLeaguesData{
  volleyball: League[]
  handball: League[]
}

interface Props {
  leagueIds: number[]
  sport: "volleyball" | "handball"
}
export const TopLeagues = ({ leagueIds, sport }: Props) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const topLeaguesData: TopLeaguesData = {
    volleyball: topVolleyballLeagues,
    handball: topHandballLeagues
  }
  const leagues = topLeaguesData[sport].filter(l => leagueIds.includes(l.id))

  const isActive = (path: string) => {
    if (!pathname) return false
    return pathname.includes(path)
  }

  return (
    <section>
      <h3>Popularne ligi:</h3>
      <section className="top-leagues" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {leagues.map((l: League) => {
          const { id, name, logo, type, country } = l
          return (
            <div 
              className={`league ${isActive(`${id}`) ? 'active' : ''}`} 
              key={id} 
              onClick={() => navigate(`/${sport}/leagues/${id}`)}
              style={{ 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                borderRadius: "6px",
                padding: "6px 10px 6px 8px",
                background:"#30343c",
                border: isActive(`${id}`) ? "1px solid var(--main-color)" : "unset",
                borderLeft: isActive(`${id}`) ? "4px solid var(--main-color)" : "unset",
                boxShadow: isActive(`${id}`) ? "0 0px 14px -6px var(--main-color)" : "unset"
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                  marginRight: "15px",
                  background: "#fff",
                  padding: "4px",
                  borderRadius: "6px"
                } as React.CSSProperties}
              />
              <div>
                <p style={{ margin: 0, fontWeight: "bold", color: isActive(`${id}`) ? "var(--main-color)" : "inherit" }}>{name}</p>
                <i style={{ fontSize: "11px", color: "#d8d8d8" }}>{country.name}</i>
              </div>
            </div>
          )
        })}
      </section>
    </section>
  )
}

export default TopLeagues