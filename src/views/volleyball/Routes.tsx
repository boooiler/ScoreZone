import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"

const Volleyball = React.lazy(() => import('./pages'))

const routes: RouteObject[] = [
  {
    path: 'volleyball',
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <Volleyball />
      </Suspense>
    )
  }
]

export default routes