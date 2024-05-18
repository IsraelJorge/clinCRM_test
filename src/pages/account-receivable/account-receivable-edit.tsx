import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AccountReceivableForm } from '@/components/account-receivable-form'
import { ContainerLayout } from '@/components/layouts/container-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AccountReceivableForm as AccountReceivableFormType } from '@/data/schemas/AccountReceivable'
import {
  Types,
  useAccountReceivable,
} from '@/providers/account-receivable-provider'
import { Routes } from '@/utils/ui/Routes'

export function AccountReceivableEdit() {
  const navigate = useNavigate()
  const { id } = useParams() as { id: string }

  const { dispatch, accountReceivable } = useAccountReceivable()

  const handleSubmitEdit = (data: AccountReceivableFormType) => {
    dispatch({ type: Types.UPDATE, payload: data })
    toast('Conta a receber editada com sucesso', { type: 'success' })
    navigate(Routes.home)
  }

  useEffect(() => {
    dispatch({ type: Types.GET, payload: { id } })
  }, [id])

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
