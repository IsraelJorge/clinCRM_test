import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export const Root = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
    </main>
  )
}
