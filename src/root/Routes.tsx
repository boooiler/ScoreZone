import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"
import ErrorPage from "./ErrorPage"

const AppWrapper = React.lazy(() => import('./App'))

export const routes: RouteObject[] = [
  // {
  //   path: '/',
  //   element: <div>Hello!</div>,
  //   errorElement: <ErrorPage />
  // },
  {
    path: '/',
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <AppWrapper />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: []
  }
]