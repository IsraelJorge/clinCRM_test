import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDialog } from '@/contexts/dialog-context'

export function Dialog() {
  const { current, closeDialog } = useDialog()
  const open = current?.open === true

  return (
    <AlertDialog open={open} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {current?.title && (
            <AlertDialogTitle>{current.title}</AlertDialogTitle>
          )}
          {current?.message && (
            <AlertDialogDescription>{current.message}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {current?.buttons.map((button, index) => {
            const key = `dialog-button-${index}`
            const isCancel = button.type === 'cancel'

            return isCancel ? (
              <AlertDialogCancel
                key={key}
                onClick={() => {
                  button.onClick?.()
                  closeDialog()
                }}
              >
                {button.label}
              </AlertDialogCancel>
            ) : (
              <AlertDialogAction
                key={key}
                onClick={() => {
                  button.onClick?.()
                  closeDialog()
                }}
              >
                {button.label}
              </AlertDialogAction>
            )
          })}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
