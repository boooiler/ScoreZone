import Loader from "@/shared/components/loader"
import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"

const Handball = React.lazy(() => import('./pages'))
const LeagueDetails = React.lazy(() => import('./pages/leagueDetails/LeagueDetails'))

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
        <LeagueDetails />
      </Suspense>
    )
  }
]

export default routes