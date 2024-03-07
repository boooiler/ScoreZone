import Loader from "@/shared/components/loader"
import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"

const Volleyball = React.lazy(() => import('./pages'))
const LeagueDetails = React.lazy(() => import('./pages/leagueDetails/LeagueDetails'))

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
        <LeagueDetails />
      </Suspense>
    )
  }
]

export default routes