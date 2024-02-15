import { useEffect, useState } from "react"
import { useFootballStandings } from "../api/footballQuery"

interface Props {
    league: number
    season: number
}
export const FootballStandings = ({ league, season }: Props) => {
  const { data: standingsData, isLoading } = useFootballStandings(season, league)
  const [_standings, setStandings] = useState<any[]>()

  useEffect(() => {
    if(standingsData) {
      const { response: [{ league: { standings } }] } = standingsData
      setStandings(standings[0])
    }
  }, [standingsData])

  return (
    <>
      <h2>Tabela</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th style={{ textAlign: "left" }}>Drużyna</th>
            <th>M</th>
            <th>W</th>
            <th>R</th>
            <th>P</th>
            <th>B</th>
            <th>RB</th>
            <th>PKT</th>
            <th>Forma</th>
          </tr>
        </thead>
        <tbody>
          {_standings && _standings.length > 0 && _standings.map(({ rank, team, points, goalsDiff, group, form, status, description, all, home, away }) => (
            <tr key={rank}>
              <td style={{ padding: "0 14px", textAlign: "center" }}>{rank}.)</td>
              <td style={{ padding: "0 20px 0 0", textAlign: "center" }}>
                <div className="team">
                  <img
                    src={team.logo}
                    alt="logo"
                    style={{
                      width: "20px",
                      height: "20px",
                      objectFit: "contain",
                      marginRight: "15px"
                    } as React.CSSProperties}
                  />
                  <span>{team.name}</span>
                </div>
              </td>
              <td style={{ padding: "0 14px", textAlign: "center" }}>{all.played}</td>
              <td style={{ padding: "0 14px", textAlign: "center" }}>{all.win}</td>
              <td style={{ padding: "0 14px", textAlign: "center" }}>{all.draw}</td>
              <td style={{ padding: "0 14px", textAlign: "center" }}>{all.lose}</td>
              <td style={{ padding: "0 14px", textAlign: "center" }}>{all.goals.for}:{all.goals.against}</td>
              <td style={{ padding: "0 14px", textAlign: "center" }}>{goalsDiff}</td>
              <td style={{ padding: "0 14px", textAlign: "center" }}>{points}</td>
              <td style={{ padding: "0 14px", textAlign: "center" }}>{form}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}