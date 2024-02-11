import { useTranslation } from 'react-i18next'

const LanguageChanger = () => {
  const { i18n } = useTranslation()

  const handleChangeLanguage = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    i18n.changeLanguage(value)
  }

  return (
    <select onChange={handleChangeLanguage} defaultValue={i18n.language}>
      <option value="pl">PL</option>
      <option value="en">EN</option>
    </select>
  )
}

export default LanguageChanger
