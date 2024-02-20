import Loader from "@/shared/components/loader"
import React, { Suspense } from "react"
import { RouteObject } from "react-router"

const Football = React.lazy(() => import('./pages/index'))
const Leagues = React.lazy(() => import('./pages/Leagues'))
const LeagueDetails = React.lazy(() => import('./pages/LeagueDetails'))
const TeamDetails = React.lazy(() => import('./pages/TeamDetails'))

const routes: RouteObject[] = [
  {
    path: 'football',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <Football />
      </Suspense>
    )
  },
  {
    path: 'football/leagues',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <Leagues />
      </Suspense>
    )
  },
  {
    path: 'football/leagues/:leagueId',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <LeagueDetails />
      </Suspense>
    )
  },
  {
    path: 'football/teams/:teamId',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <TeamDetails />
      </Suspense>
    )
  }
]

export default routes