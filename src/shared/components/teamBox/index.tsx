import { useNavigate } from "react-router-dom"
import "./styles.scss"

interface Props {
    id: string
    name: string
    photo: string
}
export const TeamBox = ({ id, name, photo }: Props) => {
  const navigate = useNavigate()
    
  return (
    <div className="team-box" onClick={() => navigate(`/football/teams/${id}`)}>
      <img src={photo} alt="logo" />
      <p>{name}</p>
    </div>
  )
}