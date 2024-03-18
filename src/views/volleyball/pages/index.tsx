import { useTranslation } from 'react-i18next'

import { SportPage } from '@/shared/components/sportPage'
import TopLeagues from '@/shared/components/topLeagues'

import './styles.scss'

export const Volleyball = () => {
  const { t } = useTranslation()

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues leagueIds={[97, 113, 120]} sport="volleyball" />
      </section>
      <section className="page-wrapper">
        <h1>{t('root.menu.volleyball')}</h1>
        <SportPage />
      </section>
    </>
  )
}

export default Volleyball