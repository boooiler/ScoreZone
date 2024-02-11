import { useFootballTeams } from "../api/footballQuery"
import './styles.scss'

export const Football = () => {
  const { data: teams, isLoading } = useFootballTeams()

  return (
    <div>
      <h1>Piłka nożna</h1>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        teams.response && teams.response.map((t: any) => {
          const { team } = t
          team.name
          return <div className="team">
            <img
              src={team.logo}
              alt="logo"
              style={
                {
                  width: "30px",
                  height: "30px",
                  objectFit: "contain",
                  marginRight: "15px"
                } as React.CSSProperties
              }
            />
            <span>{team.name}</span>
          </div>
        })
      )}
    </div>
  )
}

export default Football