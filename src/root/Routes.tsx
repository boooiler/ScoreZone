import React, { Suspense } from "react"
import { Navigate, RouteObject } from "react-router-dom"

import ErrorPage from "./ErrorPage"
import Loader from "@/shared/components/loader"
import FootballRoutes from '@/views/football/Routes'
import HandballRoutes from '@/views/handball/Routes'
import NewsRoutes from '@/views/news/Routes'
import VolleyballRoutes from '@/views/volleyball/Routes'

const AppWrapper = React.lazy(() => import('./App'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='news' />,
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
      ...HandballRoutes,
      ...NewsRoutes
    ]
  }
]

export default routes