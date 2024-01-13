import { useTranslation } from "react-i18next"
import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
  const { t } = useTranslation()

  const error: any = useRouteError()
  console.error(error)

  return (
    <div className="error-page">
      {t('errors.title')}
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage