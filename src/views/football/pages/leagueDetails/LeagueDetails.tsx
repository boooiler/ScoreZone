import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import Loader from "@/shared/components/loader"
import { Tab, TabGroup } from "@/shared/components/tabs"
import { TeamBox } from "@/shared/components/teamBox"
import TopLeagues from "@/shared/components/topLeagues"
import { useFootballLeagues, useFootballTeams } from "@/views/football/api/footballQuery"
import { FootballFixtures } from "@/views/football/components/footballFixtures/FootballFixtures"
import { FootballStandings } from "@/views/football/components/footballStandings/FootballStandings"
import { FootballLeague } from "@/views/football/model/league"

import './styles.scss'

export const LeagueDetails = () => {
  const { leagueId } = useParams()
  const { t } = useTranslation()
  const { data: leagueDetails, isLoading: isLoadingLeague } = useFootballLeagues(undefined, [Number(leagueId)])
  const [leagueInfo, setLeagueInfo] = useState<FootballLeague>()
  
  useEffect(() => {
    if(leagueDetails){
      setLeagueInfo(leagueDetails[0])
    }
  }, [leagueDetails])
  
  const { data: teams, isLoading: isLoadingTeams } = useFootballTeams(undefined, leagueInfo && leagueInfo.seasons[leagueInfo.seasons.length - 1].year, Number(leagueId))

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues sport="football" leagueIds={[4, 39, 78, 106, 107, 135, 140]} />
      </section>
      <section className="page-wrapper football-league-details">
        {isLoadingTeams || isLoadingLeague || !leagueInfo || !teams ? (
          <Loader fullscreen />
        ) : (
          <>
            <section className="league-details-header">
              <div className="league-details-header--top">
                <img
                  src={leagueInfo.league.logo}
                  alt="logo"
                  className="league-logo"
                />
                <h1 className="league-name">{leagueInfo.league.name}</h1>
              </div>

              <div className="league-details-header--bottom">
                <div className="league-info">
                  <span>{t('shared.season')}</span>
                  <h4>
                    {leagueInfo.seasons[leagueInfo.seasons.length - 1].year}
                  /
                    {leagueInfo.seasons[leagueInfo.seasons.length - 1].year + 1}
                  </h4>
                </div>
                <div className="league-info">
                  <span>{t('shared.country')}</span>
                  <h4>{leagueInfo.country.name}</h4>
                </div>
                <div className="league-info">
                  <span>{t('shared.teams')}</span>
                  <h4>{teams.response.length}</h4>
                </div>
              </div>
            </section>

            <TabGroup>
              <Tab label={t('shared.standings')}>
                <FootballStandings league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].year} />
              </Tab>
              <Tab label={t('shared.results')}>
                <section className="fixtures">
                  <FootballFixtures fixturesType="finished" league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].year} />
                </section>
              </Tab>
              <Tab label={t('shared.matches')}>
                <section className="fixtures">
                  <FootballFixtures fixturesType="planned" league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].year} />
                </section>
              </Tab>
              <Tab label={t('shared.teams')}>
                <section className="teams">
                  {teams.response && teams.response.map((t: any) => {
                    const { team } = t
                    return <TeamBox sport="football" key={team.id} id={team.id} name={team.name} photo={team.logo} />
                  })}
                </section>
              </Tab>
            </TabGroup>
          </>
        )}
      </section>
    </>
  )
}

export default LeagueDetails