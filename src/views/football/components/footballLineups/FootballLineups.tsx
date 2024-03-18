import { useTranslation } from "react-i18next"

import { useFootballLineups } from "../../api/footballQuery"
import { Player } from "../../model/lineups"
import Loader from "@/shared/components/loader"
import Icon from "@/shared/icons/Icon"

import "./styles.scss"

interface Props {
  fixtureId: string
}
export const FootballLineups = ({ fixtureId }: Props) => {
  const { t } = useTranslation()
  const { data, isLoading } = useFootballLineups(Number(fixtureId))

  const mapPlayers = (players: any) => {
    if(!players) return {}
    return players.map((p: any) => {
      const { player } = p
      return renderPlayer(player)
    })
  }

  const renderPlayer = (player: Player) => {
    return (
      <div className="player-item" key={player.id}>
        {player.number && <div className={`player-item--number ${player.pos === 'G' ? 'gk' : ''}`}>
          <Icon name="IconShirt" variant="filled" />
          <span style={{ color: "var(--number-color)" }}>{player.number}</span>
        </div>}
        <div className="player-item--name">{player.name}</div>
      </div>
    )
  }

  const renderLine = (players: any[]) => (
    <div className="formation-line">
      {players.map((p) => {
        const { player } = p
        return renderPlayer(player)
      })}
    </div>
  )

  const renderFormation = (team: any) => {
    const formation = `1-${team.formation}`
    const lines = formation.split('-').map(Number)
    const renderedFormation: JSX.Element[] = []

    let x = 1
    for (const line of lines) {
      const playersInLine = team.startXI.filter((player: any) => player.player.grid.startsWith(`${x}:`))
      renderedFormation.push(renderLine(playersInLine))
      x++
    }

    return renderedFormation
  }
  
  return (
    isLoading ? (
      <Loader />
    ) : !data[0] || !data[1] ? (
      <>{t('shared.notLineups')}</>
    ) : (
      <section style={{
        "--home-shirt-color": `#${data[0].team.colors && data[0].team.colors.player.primary}`,
        "--home-border-color": `#${data[0].team.colors && data[0].team.colors.player.border}`,
        "--home-number-color": `#${data[0].team.colors && data[0].team.colors.player.number}`,
        "--home-gk-shirt-color": `#${data[0].team.colors && data[0].team.colors.goalkeeper.primary}`,
        "--home-gk-border-color": `#${data[0].team.colors && data[0].team.colors.goalkeeper.border}`,
        "--home-gk-number-color": `#${data[0].team.colors && data[0].team.colors.goalkeeper.number}`,
        "--away-shirt-color": `#${data[1].team.colors && data[1].team.colors.player.primary}`,
        "--away-border-color": `#${data[1].team.colors && data[1].team.colors.player.border}`,
        "--away-number-color": `#${data[1].team.colors && data[1].team.colors.player.number}`,
        "--away-gk-shirt-color": `#${data[1].team.colors && data[1].team.colors.goalkeeper.primary}`,
        "--away-gk-border-color": `#${data[1].team.colors && data[1].team.colors.goalkeeper.border}`,
        "--away-gk-number-color": `#${data[1].team.colors && data[1].team.colors.goalkeeper.number}`
      } as React.CSSProperties}>
        <section className="lineups-wrapper">
          {data[0].formation || data[1].formation ? (
            <>
              <p>{t('shared.formation')}</p>
              <section className="lineups-field">
                <div className="lineups-formation team-home">
                  {data[0].formation && renderFormation(data[0])}
                </div>
                <div className="lineups-formation team-away">
                  {data[1].formation && renderFormation(data[1])}
                </div>
              </section>
            </>
          ) : (
            <>
              <p>{t('shared.startingLineups')}</p>
              <div className="lineups-wrapper--team team-home">
                {data[0].startXI && mapPlayers(data[0].startXI)}
              </div>
              <div className="lineups-wrapper--team team-away">
                {data[1].startXI && mapPlayers(data[1].startXI)}
              </div>
            </>
          )}

          <p>{t('shared.substitutes')}</p>
          <div className="lineups-wrapper--team team-home">
            {data[0].substitutes && mapPlayers(data[0].substitutes)}
          </div>
          <div className="lineups-wrapper--team team-away">
            {data[1].substitutes && mapPlayers(data[1].substitutes)}
          </div>

          <p>{t('shared.coaches')}</p>
          <div className="lineups-wrapper--team team-home coach">
            {data[0].coach.photo && <img src={data[0].coach.photo} alt="coach photo" width={30} /> }
            {data[0].coach.name}
          </div>
          <div className="lineups-wrapper--team team-away coach">
            {data[1].coach.photo && <img src={data[1].coach.photo} alt="coach photo" width={30} /> }
            {data[1].coach.name}
          </div>
        </section>
      </section>
    )
  )
}