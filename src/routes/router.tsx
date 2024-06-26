import { createBrowserRouter } from 'react-router-dom'

import { AccountReceivableEdit } from '@/pages/account-receivable-edit'
import { AccountReceivableRegister } from '@/pages/account-receivable-register'
import { Dashboard } from '@/pages/dashboard'
import { Home } from '@/pages/home'
import { Routes } from '@/utils/ui/Routes'

import { Root } from './root'

export const router = createBrowserRouter([
  {
    path: Routes.home,
    element: <Root />,
    children: [
      {
        path: Routes.home,
        element: <Home />,
      },
      {
        path: Routes.accountReceivableRegister,
        element: <AccountReceivableRegister />,
      },
      {
        path: Routes.accountReceivableEdit(':id'),
        element: <AccountReceivableEdit />,
      },
      {
        path: Routes.dashboard,
        element: <Dashboard />,
      },
    ],
  },
])
