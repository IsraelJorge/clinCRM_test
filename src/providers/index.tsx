import { DialogProvider } from './dialog-provider'
import { RouterProvider } from './router-provider'

export type ProvidersProps = {
  children: React.ReactNode
}

export function Providers() {
  return (
    <DialogProvider>
      <RouterProvider />
    </DialogProvider>
  )
}
