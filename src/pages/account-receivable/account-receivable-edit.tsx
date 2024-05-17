import { AccountReceivableForm } from '@/components/account-receivable-form'
import { ContainerLayout } from '@/components/layouts/container-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AccountReceivableEdit() {
  return (
    <ContainerLayout className="flex h-full flex-auto items-center justify-center">
      <Card className="max-w-screen-sm">
        <CardHeader>
          <CardTitle>Editar Conta a receber</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountReceivableForm />
        </CardContent>
      </Card>
    </ContainerLayout>
  )
}
