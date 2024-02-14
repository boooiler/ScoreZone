import Loader from "@/shared/components/loader"
import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"

const Volleyball = React.lazy(() => import('./pages'))

const routes: RouteObject[] = [
  {
    path: 'volleyball',
    element: (
      <Suspense fallback={<Loader />}>
        <Volleyball />
      </Suspense>
    )
  }
]

export default routes