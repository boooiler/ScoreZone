import { useTranslation } from 'react-i18next'
import './styles.scss'

const LanguageChanger = () => {
  const { i18n } = useTranslation()

  const handleChangeLanguage = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    i18n.changeLanguage(value)
  }

  return (
    <div className='lang-switch'>
      <input 
        checked={i18n.language === 'en'}
        name="language" 
        onChange={e => handleChangeLanguage(e)} 
        value="en" 
        type="radio" 
        id='lang-en'
      />
      <label htmlFor='lang-en'>EN</label>
      <input 
        name="language" 
        value="pl"
        checked={i18n.language === 'pl'}
        type="radio" 
        onChange={e => handleChangeLanguage(e)}
        id='lang-pl'
      />
      <label htmlFor='lang-pl'>PL</label>
    </div>
  )
}

export default LanguageChanger
