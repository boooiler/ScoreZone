import { useNavigate } from "react-router-dom"
import moment from "moment"

import { FixturePeriodScores } from "@/shared/model/fixtures"
import { OtherSports } from "@/shared/model/league"

import "./styles.scss"

interface Props {
  sport: OtherSports
  id: number
  date: string
  teamHome: {
    name: string
    logo: string
  }
  teamAway: {
    name: string
    logo: string
  }
  shortStatus: string
  scores: FixturePeriodScores
  isClickable?: boolean
}
export const FixtureRow = ({ sport, id, date, teamHome, teamAway, shortStatus, scores, isClickable = false }: Props) => {
  const navigate = useNavigate()

  return (
    <div
      className={`fixture-row ${isClickable ? 'clickable' : ''}`}
      onClick={isClickable ? () => navigate(`/${sport}/fixtures/${id}`) : undefined}
    >
      <div className="match-date">
        <b>{moment(date).format("HH:mm")}</b>
        <p>{moment(date).format("DD/MM/YY")}</p>
      </div>
      <div className="team">
        <img
          src={teamHome.logo}
          alt="team logo"
        />
        <span>{teamHome.name}</span>
      </div>
      <div className="score">
        {shortStatus === 'FT' ? (
          <><div>{scores.home}</div> : <div>{scores.away}</div></>
        ) : (
          <><div>-</div> : <div>-</div></>
        )}
      </div>
      <div className="team">
        <span>{teamAway.name}</span>
        <img
          src={teamAway.logo}
          alt="team logo"
        />
      </div>
    </div>
  )
}