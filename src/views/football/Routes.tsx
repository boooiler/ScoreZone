import Loader from "@/shared/components/loader"
import React, { Suspense } from "react"
import { RouteObject } from "react-router"

const Football = React.lazy(() => import('./pages/index'))
const Leagues = React.lazy(() => import('./pages/Leagues'))
const LeagueDetails = React.lazy(() => import('./pages/LeagueDetails'))

const routes: RouteObject[] = [
  {
    path: 'football',
    element: (
      <Suspense fallback={<Loader />}>
        <Football />
      </Suspense>
    )
  },
  {
    path: 'football/leagues',
    element: (
      <Suspense fallback={<Loader />}>
        <Leagues />
      </Suspense>
    )
  },
  {
    path: 'football/leagues/:leagueId',
    element: (
      <Suspense fallback={<Loader />}>
        <LeagueDetails />
      </Suspense>
    )
  }
]

export default routes