import React, { Suspense } from "react"
import { Navigate, RouteObject } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import FootballRoutes from '@/views/football/Routes'

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
      <Suspense>
        <AppWrapper />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      ...FootballRoutes
    ]
  }
]

export default routes