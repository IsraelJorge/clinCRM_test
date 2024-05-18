import { ToastContainer } from 'react-toastify'

import { Dialog } from '@/components/dialog'

import { AccountReceivableProvider } from '../contexts/account-receivable-context'
import { DialogProvider } from '../contexts/dialog-context'
import { ThemeProvider } from '../contexts/theme-context'
import { RouterProvider } from '../routes/router-provider'

export type ProvidersProps = {
  children: React.ReactNode
}

export function Providers() {
  return (
    <ThemeProvider>
      <AccountReceivableProvider>
        <DialogProvider>
          <RouterProvider />
          <ToastContainer />
          <Dialog />
        </DialogProvider>
      </AccountReceivableProvider>
    </ThemeProvider>
  )
}
