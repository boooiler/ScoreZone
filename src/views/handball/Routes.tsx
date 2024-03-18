import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"

import Loader from "@/shared/components/loader"

const Handball = React.lazy(() => import('./pages'))
const LeagueDetails = React.lazy(() => import('../volleyball/pages/leagueDetails/LeagueDetails'))
const TeamDetails = React.lazy(() => import('../volleyball/pages/teamDetails/TeamDetails'))
const FixtureDetails = React.lazy(() => import('../volleyball/pages/fixtureDetails/FixtureDetails'))

const routes: RouteObject[] = [
  {
    path: 'handball',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <Handball />
      </Suspense>
    )
  },
  {
    path: 'handball/leagues/:leagueId',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <LeagueDetails sport="handball" />
      </Suspense>
    )
  },
  {
    path: 'handball/teams/:teamId',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <TeamDetails sport="handball" />
      </Suspense>
    )
  },
  {
    path: 'handball/fixtures/:fixtureId',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <FixtureDetails sport="handball" />
      </Suspense>
    )
  }
]

export default routes