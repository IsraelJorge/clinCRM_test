import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AccountReceivableForm } from '@/components/account-receivable-form'
import { ContainerLayout } from '@/components/layouts/container-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAccountReceivableEdit } from '@/data/hooks/useAccountReceivableEdit'
import { useAccountReceivableGet } from '@/data/hooks/useAccountReceivableGet'
import { AccountReceivableForm as AccountReceivableFormType } from '@/data/schemas/AccountReceivable'
import { Routes } from '@/utils/ui/Routes'

export function AccountReceivableEdit() {
  const navigate = useNavigate()
  const { id } = useParams() as { id: string }

  const { accountReceivable } = useAccountReceivableGet(id)

  const { update } = useAccountReceivableEdit()

  const handleSubmitEdit = (data: AccountReceivableFormType) => {
    update(data)
    toast('Conta a receber editada com sucesso', { type: 'success' })
    navigate(Routes.home)
  }

  return (
    <ContainerLayout className="flex h-full flex-auto items-center justify-center">
      <Card className="max-w-screen-sm">
        <CardHeader>
          <CardTitle>Editar Conta a receber</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountReceivableForm
            onSubmit={handleSubmitEdit}
            defaultValue={accountReceivable}
          />
        </CardContent>
      </Card>
    </ContainerLayout>
  )
}
