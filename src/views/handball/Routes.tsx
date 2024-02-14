import Loader from "@/shared/components/loader"
import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"

const Handball = React.lazy(() => import('./pages'))

const routes: RouteObject[] = [
  {
    path: 'handball',
    element: (
      <Suspense fallback={<Loader />}>
        <Handball />
      </Suspense>
    )
  }
]

export default routes