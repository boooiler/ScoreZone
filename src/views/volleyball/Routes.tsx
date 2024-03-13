import Loader from "@/shared/components/loader"
import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"

const Volleyball = React.lazy(() => import('./pages'))
const LeagueDetails = React.lazy(() => import('./pages/leagueDetails/LeagueDetails'))
const TeamDetails = React.lazy(() => import('./pages/teamDetails/TeamDetails'))
const FixtureDetails = React.lazy(() => import('./pages/fixtureDetails/FixtureDetails'))

const routes: RouteObject[] = [
  {
    path: 'volleyball',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <Volleyball />
      </Suspense>
    )
  },
  {
    path: 'volleyball/leagues/:leagueId',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <LeagueDetails sport="volleyball" />
      </Suspense>
    )
  },
  {
    path: 'volleyball/teams/:teamId',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <TeamDetails sport="volleyball" />
      </Suspense>
    )
  },
  {
    path: 'volleyball/fixtures/:fixtureId',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <FixtureDetails sport="volleyball" />
      </Suspense>
    )
  }
]

export default routes