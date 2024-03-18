import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useFootballStandings } from "../../api/footballQuery"
import { FootballStandingInfo } from "../../model/standings"
import Loader from "@/shared/components/loader"

import './styles.scss'

interface Props {
    league: number
    season: number
}
export const FootballStandings = ({ league, season }: Props) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data: standingsData, isLoading } = useFootballStandings(season, league)
  const [_standings, setStandings] = useState<FootballStandingInfo[][]>()

  useEffect(() => {
    if(standingsData) {
      const { league: { standings } } = standingsData
      setStandings(standings)
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
        _standings && _standings.length > 0 && _standings.map((standing: FootballStandingInfo[]) => (
          <section className="standings">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th className="th-team">{t('shared.table.team')}</th>
                  <th>{t('shared.table.points')}</th>
                  <th>{t('shared.table.allMatches')}</th>
                  <th>{t('shared.table.win')}</th>
                  <th>{t('shared.table.draw')}</th>
                  <th>{t('shared.table.lose')}</th>
                  <th>{t('shared.table.goals')}</th>
                  <th>{t('shared.table.diff')}</th>
                  <th>{t('shared.table.form')}</th>
                </tr>
              </thead>
              <tbody>
                {standing && standing.length > 0 ? standing.map(({ rank, team, points, goalsDiff, group, form, status, description, all, home, away }) => (
                  <tr key={rank}>
                    <td className={`td-rank ${rankColor(description)}`}>{rank}</td>
                    <td className="td-team" onClick={() => navigate(`/football/teams/${team.id}`)}>
                      <div className="team">
                        <img src={team.logo} alt="logo" />
                        <span>{team.name}</span>
                      </div>
                    </td>
                    <td className="td-points">{points}</td>
                    <td>{all.played}</td>
                    <td>{all.win}</td>
                    <td>{all.draw}</td>
                    <td>{all.lose}</td>
                    <td>{all.goals.for}:{all.goals.against}</td>
                    <td>{goalsDiff}</td>
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