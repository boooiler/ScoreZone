import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "@/shared/components/loader"
import { useFootballStandings } from "../../api/footballQuery"
import { FootballStandingInfo } from "../../model/standings"
import './styles.scss'

interface Props {
    league: number
    season: number
}
export const FootballStandings = ({ league, season }: Props) => {
  const navigate = useNavigate()
  const { data: standingsData, isLoading } = useFootballStandings(season, league)
  const [_standings, setStandings] = useState<FootballStandingInfo[]>()

  useEffect(() => {
    if(standingsData) {
      const { league: { standings } } = standingsData
      setStandings(standings[0])
    }
  }, [standingsData])

  const splitForm = (form: string) => {
    return form.split("").map((letter: string, index: number) => (
      <span 
        key={index} 
        style={{
          width: "20px",
          height: "20px",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
          fontWeight: "600",
          fontFamily: "Onest",
          borderRadius: "6px",
          background: letter === "W" ? "green" : letter === "L" ? "red" : "orange"
        }}
      >
        {letter}
      </span>
    ))
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="standings">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th className="th-team">Drużyna</th>
                <th>M</th>
                <th>W</th>
                <th>R</th>
                <th>P</th>
                <th>B</th>
                <th>+/-</th>
                <th>PKT</th>
                <th>Forma</th>
              </tr>
            </thead>
            <tbody>
              {_standings && _standings.length > 0 ? _standings.map(({ rank, team, points, goalsDiff, group, form, status, description, all, home, away }) => (
                <tr key={rank}>
                  <td>{rank}.</td>
                  <td className="td-team" onClick={() => navigate(`/football/teams/${team.id}`)}>
                    <div className="team">
                      <img src={team.logo} alt="logo" />
                      <span>{team.name}</span>
                    </div>
                  </td>
                  <td>{all.played}</td>
                  <td>{all.win}</td>
                  <td>{all.draw}</td>
                  <td>{all.lose}</td>
                  <td>{all.goals.for}:{all.goals.against}</td>
                  <td>{goalsDiff}</td>
                  <td>{points}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                      {splitForm(form)}
                    </div>
                  </td>
                </tr>
              )) : (
                <div>Brak danych</div>
              )}
            </tbody>
          </table>
        </section>
      )}
    </>
  )
}