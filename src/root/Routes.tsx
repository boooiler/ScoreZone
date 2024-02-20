import React, { Suspense } from "react"
import { Navigate, RouteObject } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import FootballRoutes from '@/views/football/Routes'
import VolleyballRoutes from '@/views/volleyball/Routes'
import HandballRoutes from '@/views/handball/Routes'
import Loader from "@/shared/components/loader"

const AppWrapper = React.lazy(() => import('./App'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='football' />,
    errorElement: <ErrorPage />
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <AppWrapper />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      ...FootballRoutes,
      ...VolleyballRoutes,
      ...HandballRoutes
    ]
  }
]

export default routes