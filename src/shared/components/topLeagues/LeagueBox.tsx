import { useLocation, useNavigate } from "react-router-dom"

import { AllSports } from "@/shared/model/league"

import "./styles.scss"

interface Props {
    sport: AllSports
    leagueId: number
    logo: string
    name: string
    country: string
}
export const LeagueBox = ({ sport, leagueId, logo, name, country }: Props) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isActive = (path: string) => {
    if (!pathname) return false
    const [, , , id] = pathname.split('/')
    return id === path
  }
    
  return (
    <div 
      className={`league ${isActive(`${leagueId}`) ? 'active' : ''}`} 
      key={leagueId} 
      onClick={() => navigate(`/${sport}/leagues/${leagueId}`)}
    >
      <img
        src={logo}
        alt="league logo"
      />
      <div>
        <p>{name}</p>
        <i>{country}</i>
      </div>
    </div>
  )
}