import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

function AppWrapper () {
  const { t } = useTranslation()

  return (
    <main className='app-wrapper'>
      {t('common.cancel')}
      {/* <Outlet /> */}
    </main>
  )
}

export default AppWrapper
