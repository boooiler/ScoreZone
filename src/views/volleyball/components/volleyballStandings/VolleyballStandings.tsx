import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { VolleyballStandingInfo } from "../../model/standings"
import { useStandings } from "@/shared/api/sportQuery"
import Loader from "@/shared/components/loader"

import './styles.scss'

interface Props {
  sport: "volleyball" | "handball"
  league: number
  season: number
}
export const VolleyballStandings = ({ sport, league, season }: Props) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data: standingsData, isLoading } = useStandings(sport, season, league)
  const [_standings, setStandings] = useState<VolleyballStandingInfo[][]>()

  useEffect(() => {
    if(standingsData) {
      setStandings(standingsData)
    }
  }, [standingsData])

  const splitForm = (form: string) => {
    return form.split("").map((letter: string, index: number) => (
      <span 
        key={index} 
        style={{
          background: letter === "W" ? "green" : letter === "L" ? "red" : "orange"
        }}
      >
        {t(`shared.table.formLetters.${letter}`)}
      </span>
    ))
  }

  const rankColor = (desc: string): string => {
    if(!desc) return ""
    const d = desc.toLowerCase()

    if(d.includes("relegation")){
      return "bg-red"
    } else if (d.includes("champions league") || d === "promotion") {
      return "bg-blue"
    } else if (d.includes("europa league")) {
      return "bg-green"
    } else if (d.includes("conference league") || d.includes("promotion play-off")) {
      return "bg-orange"
    } 
    return ""
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        _standings && _standings.length > 0 && _standings.map((standing: VolleyballStandingInfo[]) => (
          <section className="standings">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th className="th-team">{t('shared.table.team')}</th>
                  <th>{t('shared.table.points')}</th>
                  <th>{t('shared.table.allMatches')}</th>
                  <th>{t('shared.table.win')}</th>
                  <th>{t('shared.table.lose')}</th>
                  <th>{t('shared.table.goals')}</th>
                  <th>{t('shared.table.form')}</th>
                </tr>
              </thead>
              <tbody>
                {standing && standing.length > 0 ? standing.map(({ position, stage, group, team, points, league, country, form, games, description, goals }) => (
                  <tr key={position}>
                    <td className={`td-rank ${rankColor(description)}`}>{position}</td>
                    <td className="td-team" onClick={() => navigate(`/${sport}/teams/${team.id}`)}>
                      <div className="team">
                        <img src={team.logo} alt="logo" />
                        <span>{team.name}</span>
                      </div>
                    </td>
                    <td className="td-points">{points}</td>
                    <td>{games.played}</td>
                    <td>{games.win.total}</td>
                    <td>{games.lose.total}</td>
                    <td>{goals.for}:{goals.against}</td>
                    <td className="td-form">
                      <div>
                        {splitForm(form)}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <div>{t('common.noResults')}</div>
                )}
              </tbody>
            </table>
          </section>
        ))
      )}
    </>
  )
}