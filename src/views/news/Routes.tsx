import React, { Suspense } from "react"
import { RouteObject } from "react-router"

import Loader from "@/shared/components/loader"

const News = React.lazy(() => import('./pages/index'))

const routes: RouteObject[] = [
  {
    path: 'news',
    element: (
      <Suspense fallback={<Loader fullscreen />}>
        <News />
      </Suspense>
    )
  }
]

export default routes