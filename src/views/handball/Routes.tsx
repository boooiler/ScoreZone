import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"

const Handball = React.lazy(() => import('./pages'))

const routes: RouteObject[] = [
  {
    path: 'handball',
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <Handball />
      </Suspense>
    )
  }
]

export default routes