import { createBrowserRouter } from 'react-router-dom'

import { AccountReceivableRegister } from '@/pages/account-receivable/account-receivable-register'
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
        element: <div>Account Receivable Edit</div>,
      },
    ],
  },
])
