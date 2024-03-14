import { useTranslation } from 'react-i18next'
import './styles.scss'

export const SportPage = () => {
  const { t } = useTranslation()
  
  return (
    <div className="sport-homepage">
      <img 
        src='/images/game_day.svg'
        alt='sport image'
        className='sport-homepage--image'
      />
      <p className='sport-homepage--text'>{t('shared.browseSelectedLeagues')}</p>
    </div>
  )
}