import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"
import ErrorPage from "./ErrorPage"

import FootballRoutes from '@/views/football/Routes'

const AppWrapper = React.lazy(() => import('./App'))

const routes: RouteObject[] = [
  // {
  //   path: '/',
  //   element: <div>Hello!</div>,
  //   errorElement: <ErrorPage />
  // },
  {
    path: '/',
    element: (
      <Suspense fallback={<div>loading...</div>}>
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