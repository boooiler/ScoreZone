import { useNavigate } from "react-router-dom"
import "./styles.scss"

interface Props {
  sport: string
  id: string
  name: string
  photo: string
  isClickable?: boolean
  position?: string
  age?: number
  number?: number
}
export const TeamBox = ({ sport, id, name, photo, isClickable = true, position, age, number }: Props) => {
  const navigate = useNavigate()
    
  return (
    <div className={`team-box ${isClickable ? 'clickable' : ''}`} onClick={() => isClickable && navigate(`/${sport}/teams/${id}`)}>
      <img src={photo} alt="photo" />
      <p className="name">{number && <div className="number">{number}</div>}{name}</p>
      {(age || position) && <p className="age">({position}{age && `, ${age} lat`})</p>}
    </div>
  )
}