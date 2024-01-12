import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"

const Football = React.lazy(() => import('./pages'))

const routes: RouteObject[] = [
  {
    path: 'football',
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <Football />
      </Suspense>
    )
  }
]

export default routes