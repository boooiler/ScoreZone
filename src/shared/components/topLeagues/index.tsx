import { useTranslation } from "react-i18next"

import { LeagueBox } from "./LeagueBox"
import { League, Sports, TopLeaguesData } from "@/shared/model/league"
import { FootballLeague } from "@/views/football/model/league"
import { topFootballLeagues } from "@/views/football/model/mockupLeagues"
import { topHandballLeagues } from "@/views/handball/model/mockupLeagues"
import { topVolleyballLeagues } from "@/views/volleyball/model/mockupLeagues"

import "./styles.scss"

interface Props {
  leagueIds: number[]
  sport: Sports
}
export const TopLeagues = ({ leagueIds, sport }: Props) => {
  const { t } = useTranslation()
  const topLeaguesData: TopLeaguesData = {
    volleyball: topVolleyballLeagues,
    handball: topHandballLeagues
  }
  const leagues = sport === 'football' 
    ? topFootballLeagues.filter(l => leagueIds.includes(l.league.id))
    : topLeaguesData[sport].filter(l => leagueIds.includes(l.id))

  const getLeagueInfo =(league: FootballLeague | League, sport: string) => {
    const id = sport === 'football' 
      ? (league as FootballLeague).league.id 
      : (league as League).id
    const name = sport === 'football' 
      ? (league as FootballLeague).league.name 
      : (league as League).name
    const logo = sport === 'football' 
      ? (league as FootballLeague).league.logo 
      : (league as League).logo
    const country = sport === 'football' 
      ? (league as FootballLeague).country.name 
      : (league as League).country.name
    
    return { id, name, logo, country }
  }

  return (
    <section className="top-leagues">
      <h3>{t('shared.topLeagues')}</h3>
      <section className="top-leagues--content">
        {leagues.map((league: FootballLeague | League) => {
          const { id, name, logo, country } = getLeagueInfo(league, sport)

          return (
            <LeagueBox 
              sport={sport}
              key={id}
              leagueId={id}
              name={name}
              logo={logo}
              country={country}
            />
          )
        })}
      </section>
    </section>
  )
}

export default TopLeagues