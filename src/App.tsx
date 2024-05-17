import { Dialog } from '@/components/dialog'
import { Button } from '@/components/ui/button'
import { DialogProvider } from '@/providers/dialog-provider'

function App() {
  return (
    <DialogProvider>
      <Dialog />
      <div className="flex h-screen items-center justify-center">
        <Button>Button</Button>
      </div>
    </DialogProvider>
  )
}

export default App
