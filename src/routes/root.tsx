import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export const Root = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  )
}
