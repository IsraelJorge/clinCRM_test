import { ToastContainer } from 'react-toastify'

import { Dialog } from '@/components/dialog'

import { AccountReceivableProvider } from './account-receivable-provider'
import { DialogProvider } from './dialog-provider'
import { RouterProvider } from './router-provider'

export type ProvidersProps = {
  children: React.ReactNode
}

export function Providers() {
  return (
    <AccountReceivableProvider>
      <DialogProvider>
        <RouterProvider />
        <ToastContainer />
        <Dialog />
      </DialogProvider>
    </AccountReceivableProvider>
  )
}
