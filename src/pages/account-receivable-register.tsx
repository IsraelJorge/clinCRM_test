import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AccountReceivableForm } from '@/components/account-receivable-form'
import { ContainerLayout } from '@/components/layouts/container-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AccountReceivableForm as AccountReceivableFormType } from '@/data/schemas/AccountReceivable'
import {
  Types,
  useAccountReceivable,
} from '@/contexts/account-receivable-context'
import { Routes } from '@/utils/ui/Routes'

export function AccountReceivableRegister() {
  const navigate = useNavigate()

  const { dispatch } = useAccountReceivable()

  const handleSubmitAccountReceivable = (data: AccountReceivableFormType) => {
    dispatch({ type: Types.ADD, payload: data })
    toast('Conta a receber criada com sucesso', { type: 'success' })
    navigate(Routes.home)
  }

  return (
    <ContainerLayout className="flex h-full flex-auto items-center justify-center">
      <Card className="max-w-screen-sm">
        <CardHeader>
          <CardTitle>Nova Conta a receber</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountReceivableForm onSubmit={handleSubmitAccountReceivable} />
        </CardContent>
      </Card>
    </ContainerLayout>
  )
}
