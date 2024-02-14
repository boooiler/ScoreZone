import { Outlet, useLocation } from 'react-router-dom'
import NavigationBar from './navBar'

function AppWrapper () {
  const { pathname } = useLocation()

  const basePath = ():string => {
    const [, basePath] = pathname.split('/')
    return basePath
  }

  return (
    <main className={`app-wrapper page-${basePath()}`}>
      <NavigationBar />
      <section className='app-outlet'>
        <Outlet />
        <section className='favorite-teams'></section>
      </section>
    </main>
  )
}

export default AppWrapper
