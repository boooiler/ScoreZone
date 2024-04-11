import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { useLeagues, useTeams } from "@/shared/api/sportQuery"
import { Fixtures } from "@/shared/components/fixtures"
import Loader from "@/shared/components/loader"
import { Standings } from "@/shared/components/standings/Standings"
import { Tab, TabGroup } from "@/shared/components/tabs"
import { TeamBox } from "@/shared/components/teamBox"
import TopLeagues from "@/shared/components/topLeagues"
import { League } from "@/shared/model/league"

import './styles.scss'

interface Props {
  sport: "volleyball" | "handball"
}
export const LeagueDetails = ({ sport }: Props) => {
  const { t } = useTranslation()
  const { leagueId } = useParams()
  const { data: leagueDetails, isLoading: isLoadingLeague } = useLeagues(sport, Number(leagueId))
  const [leagueInfo, setLeagueInfo] = useState<League>()
  
  useEffect(() => {
    if(leagueDetails){
      setLeagueInfo(leagueDetails[0])
    }
  }, [leagueDetails])
  
  const { data: teams, isLoading: isLoadingTeams } = useTeams(sport, undefined, leagueInfo && leagueInfo.seasons[leagueInfo.seasons.length - 1].season, Number(leagueId))

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues leagueIds={sport === 'volleyball' ? [97, 113, 120] : [78, 82, 39, 103]} sport={sport} />
      </section>
      <section className="page-wrapper league-details">
        {isLoadingTeams || isLoadingLeague || !leagueInfo || !teams ? (
          <Loader fullscreen />
        ) : (
          <>
            <section className="league-details-header">
              <div className="league-details-header--top">
                <img
                  src={leagueInfo.logo}
                  alt="logo"
                  className="league-logo"
                />
                <h1 className="league-name">{leagueInfo.name}</h1>
              </div>

              <div className="league-details-header--bottom">
                <div className="league-info">
                  <span>{t('shared.season')}</span>
                  <h4>
                    {leagueInfo.seasons[leagueInfo.seasons.length - 1].season}
                  /
                    {leagueInfo.seasons[leagueInfo.seasons.length - 1].season + 1}
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
                <Standings sport={sport} league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].season} />
              </Tab>
              <Tab label={t('shared.results')}>
                <section className="fixtures">
                  <Fixtures sport={sport} fixturesType="finished" league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].season} />
                </section>
              </Tab>
              <Tab label={t('shared.matches')}>
                <section className="fixtures">
                  <Fixtures sport={sport} fixturesType="planned" league={Number(leagueId)} season={leagueInfo.seasons[leagueInfo.seasons.length - 1].season} />
                </section>
              </Tab>
              <Tab label={t('shared.teams')}>
                <section className="teams">
                  {teams.response && teams.response.map((t: any) => {
                    return <TeamBox sport={sport} id={t.id} name={t.name} photo={t.logo} />
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