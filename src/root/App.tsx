import { Outlet, useLocation } from 'react-router-dom'
import NavigationBar from './navBar'
import { useState } from 'react'

function AppWrapper () {
  const { pathname } = useLocation()
  const [navHeight, setNavHeight] = useState<number>(0)

  const basePath = ():string => {
    const [, basePath] = pathname.split('/')
    return basePath
  }

  return (
    <main className={`app-wrapper page-${basePath()}`}>
      <NavigationBar setNavHeight={height => setNavHeight(height)} />
      <section className='app-outlet' style={{ paddingTop: `${navHeight}px` }}>
        <Outlet />
        {/* TODO: <section className='favorite-teams'></section> */}
      </section>
    </main>
  )
}

export default AppWrapper
