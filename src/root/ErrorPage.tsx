import { useTranslation } from "react-i18next"
import { useRouteError } from "react-router-dom"
import NavigationBar from "./navBar"

const ErrorPage = () => {
  const { t } = useTranslation()

  const error: any = useRouteError()
  console.error(error)

  return (
    <main className="app-wrapper">
      <NavigationBar />
      <div className="error-page">
        {t('errors.title')}
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </main>
  )
}

export default ErrorPage