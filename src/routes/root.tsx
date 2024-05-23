import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export const Root = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex h-full w-full flex-auto">
        <div>
          <Sidebar />
        </div>
        <div className="size-full">
          <Header />
          <Outlet />
        </div>
      </div>
    </main>
  )
}
