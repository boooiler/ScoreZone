import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { useTeams } from "@/shared/api/sportQuery"
import { Fixtures } from "@/shared/components/fixtures"
import Loader from "@/shared/components/loader"
import { Tab, TabGroup } from "@/shared/components/tabs"
import TopLeagues from "@/shared/components/topLeagues"
import { Team } from "@/shared/model/team"

import './styles.scss'

interface Props {
  sport: "volleyball" | "handball"
}
export const TeamDetails = ({ sport }: Props) => {
  const { t } = useTranslation()
  const { teamId } = useParams()
  const { data, isLoading } = useTeams(sport, Number(teamId))
  const [teamDetails, setTeamDetails] = useState<Team>()

  useEffect(() => {
    if(data && data.response){
      setTeamDetails(data.response[0])
    }
  }, [data])

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues leagueIds={sport === 'volleyball' ? [97, 113, 120] : [78, 82, 39, 103]} sport={sport} />
      </section>
      <section className="page-wrapper team-details">
        {isLoading || !teamDetails 
          ? (
            <Loader fullscreen />
          ) : (
            <>
              <section className="team-details-header">
                <div className="team-country">
                  <img
                    src={teamDetails.country.flag}
                    alt="country flag"
                    className="country-flag"
                  />
                  <p>{teamDetails.country.name}</p>
                </div>
                <img
                  src={teamDetails.logo}
                  alt="logo"
                  className="team-logo"
                />
                <h1 className="team-name">{teamDetails.name}</h1>
              </section>

              <TabGroup>
                <Tab label={t('shared.results')}>
                  <section className="fixtures">
                    <Fixtures 
                      fixturesType="finished"
                      season={2023}
                      team={Number(teamId)} 
                      sport={sport}
                    />
                  </section>
                </Tab>
                <Tab label={t('shared.matches')}>
                  <section className="fixtures">
                    <Fixtures 
                      fixturesType="planned"
                      season={2023}
                      team={Number(teamId)} 
                      sport={sport}
                    />
                  </section>
                </Tab>
              </TabGroup>
            </>
          )}
      </section>
    </>
  )
}

export default TeamDetails