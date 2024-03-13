import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"
import Loader from "@/shared/components/loader"
import { useVolleyballGames } from "../../api/volleyballQuery"
import { Match } from "../../model/fixtureDetails"
import './styles.scss'

interface Props {
  sport: "volleyball" | "handball"
}
export const FixtureDetails = ({ sport }: Props) => {
  const { fixtureId } = useParams()
  const navigate = useNavigate()
  const { data: fixture, isLoading } = useVolleyballGames(sport, Number(fixtureId))
  const fixtureDetails: Match = fixture && fixture[0]
  const liveStatus = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'PT', 'INT', 'INTR']
  const breakStatus = ['HT', 'BT', 'INT']

  return (
    <>
      <section className="page-wrapper fixture-details">
        {isLoading || !fixtureDetails ? (
          <Loader fullscreen />
        ) : (
          <>
            <section className="fixture-details-header">
              <section className="fixture-details-header--top">
                <div 
                  className="fixture-league"
                  onClick={() => navigate(`/${sport}/leagues/${fixtureDetails.league.id}`)}
                >
                  <img src={fixtureDetails.league.logo} alt="logo" />
                  <p>{fixtureDetails.league.name}</p>
                </div>
                <p className="fixture-round">Week {fixtureDetails.week}</p>
              </section>
              <section className="fixture-details-header--bottom">
                <div className="fixture-match-info">
                  {liveStatus.includes(fixtureDetails.status.short) ? (
                    <div className="live-match">
                      {breakStatus.includes(fixtureDetails.status.short) 
                        ? <b style={{ fontSize: '12px' }}>PRZERWA</b> 
                        : <b>{fixtureDetails.time}<div>&#8242;</div></b>}
                    </div>
                  ) : (
                    <>
                      <p className="fixture-match-info--date">{moment(fixtureDetails.date).format("DD/MM/YYYY")}</p>
                      <p className="fixture-match-info--date">{moment(fixtureDetails.date).format("HH:mm")}</p>
                    </>
                  )}
                </div>
                <div className="fixture-summary">
                  <div 
                    className="fixture-summary--team fixture-summary--team__home"
                    onClick={() => navigate(`/${sport}/teams/${fixtureDetails.teams.home.id}`)}
                  >
                    <p>{fixtureDetails.teams.home.name}</p>
                    <img src={fixtureDetails.teams.home.logo} alt="logo" />
                  </div>
                  <div className="fixture-summary--result">
                    <div className="score" style={{ color: liveStatus.concat(breakStatus).includes(fixtureDetails.status.short) ? 'var(--main-color)' : 'inherit' }}>
                      <div className="score--item">
                        {fixtureDetails.scores.home}
                      </div>
                      <span>:</span>
                      <div className="score--item">
                        {fixtureDetails.scores.away}
                      </div>
                    </div>
                  </div>
                  <div 
                    className="fixture-summary--team fixture-summary--team__away"
                    onClick={() => navigate(`/${sport}/teams/${fixtureDetails.teams.away.id}`)}
                  >
                    <img src={fixtureDetails.teams.away.logo} alt="logo" />
                    <p>{fixtureDetails.teams.away.name}</p>
                  </div>
                </div>
              </section>
            </section>
          </>
        )}
      </section>
    </>
  )
}

export default FixtureDetails