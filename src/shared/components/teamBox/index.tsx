import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
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
  const { t } = useTranslation()
    
  return (
    <div className={`team-box ${isClickable ? 'clickable' : ''}`} onClick={() => isClickable && navigate(`/${sport}/teams/${id}`)}>
      <img src={photo} alt="photo" />
      <p className="name">{number && <div className="number">{number}</div>}{name}</p>
      {(age || position) && <p className="age">({t(`shared.${position?.toLowerCase()}`)}{age && `, ${age} ${t('shared.yearOld')}`})</p>}
    </div>
  )
}