import { createContext, useContext, useState } from 'react'

export type DialogProviderProps = {
  children: React.ReactNode
}

type ButtonConfig = {
  label: string
  type?: 'cancel' | 'accept'
  onClick?: VoidFunction
}

type DialogOptions = {
  title: string
  message?: string
  buttons: ButtonConfig[]
  open: boolean
}

type DialogData = {
  current?: DialogOptions
  showDialog: (options: Omit<DialogOptions, 'open'>) => void
  closeDialog: VoidFunction
}

const DialogContext = createContext<DialogData | undefined>(undefined)

export function DialogProvider({ children }: DialogProviderProps) {
  const [dialog, setDialog] = useState<DialogOptions | undefined>()

  const showDialog = (options: Omit<DialogOptions, 'open'>) => {
    setDialog({ ...options, open: true })
  }

  const closeDialog = () => {
    if (!dialog) return
    setDialog((prevState) => ({ ...prevState!, open: false }))
  }

  return (
    <DialogContext.Provider
      value={{
        current: dialog,
        showDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogContext)

  if (context === undefined) {
    throw new Error('useDialog should be used inside of a DialogProvider')
  }

  return context
}
