import Providers from './providers/Providers'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './Routes'
import './theme/normalize.css'
import './theme/main.scss'

const router = createBrowserRouter(routes)

function ScoreZoneApp () {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export default ScoreZoneApp