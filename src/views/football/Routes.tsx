import Loader from "@/shared/components/loader"
import React, { Suspense } from "react"
import { RouteObject } from "react-router"

const Football = React.lazy(() => import('./pages/index'))
const LeagueDetails = React.lazy(() => import('./pages/leagueDetails/LeagueDetails'))
const TeamDetails = React.lazy(() => import('./pages/teamDeatils/TeamDetails'))
const FixtureDetails = React.lazy(() => import('./pages/fixtureDetails/FixtureDetails'))

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
  },
  {
    path: 'football/fixtures/:fixtureId',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <FixtureDetails />
      </Suspense>
    )
  }
]

export default routes