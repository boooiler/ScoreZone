import { useTranslation } from 'react-i18next'
import TopLeagues from '@/shared/components/topLeagues'
import { SportPage } from '@/shared/components/sportPage'
import './styles.scss'

export const Handball = () => {
  const { t } = useTranslation()

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues leagueIds={[78, 82, 39, 103]} sport="handball" />
      </section>
      <section className="page-wrapper">
        <h1>{t('root.menu.handball')}</h1>
        <SportPage />
      </section>
    </>
  )
}

export default Handball