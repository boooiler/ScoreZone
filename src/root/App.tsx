import { Outlet } from 'react-router-dom'

function AppWrapper () {

  return (
    <main className='app-wrapper'>
      <Outlet />
    </main>
  )
}

export default AppWrapper
