import { Link } from 'react-router-dom'

import { DataTable } from '@/components/data-table'
import { Icon } from '@/components/icon'
import { ContainerLayout } from '@/components/layouts/container-layout'
import { Button } from '@/components/ui/button'
import { useAccountReceivableDelete } from '@/data/hooks/useAccountReceivableDelete'
import { useAccountReceivableFindAll } from '@/data/hooks/useAccountReceivableFindAll'
import { useLocalStorage } from '@/data/hooks/useLocalStorage'
import { AccountReceivable } from '@/data/schemas/AccountReceivable'
import { useDialog } from '@/providers/dialog-provider'
import { PaymentMethodMap } from '@/utils/PaymentMethodMap'
import { Routes } from '@/utils/ui/Routes'

export function Home() {
  const { showDialog } = useDialog()

  const { accountReceivables } = useAccountReceivableFindAll()
  const { remove } = useAccountReceivableDelete()

  const { onRefreshLocalStorage, refreshLocalStorage } = useLocalStorage()

  console.log({ refreshLocalStorage })

  const handleDelete = (data: AccountReceivable) => {
    showDialog({
      title: 'Excluir conta a receber',
      message: `Deseja realmente excluir a conta a receber de ${data.patientName}?`,
      buttons: [
        {
          label: 'Cancelar',
          type: 'cancel',
        },
        {
          label: 'Sim',
          onClick: () => {
            remove(data.id)
            onRefreshLocalStorage()
          },
        },
      ],
    })
  }

  return (
    <ContainerLayout>
      <header className="flex items-center justify-between py-5">
        <div className="flex items-center gap-3">
          <Icon name="CircleDollarSign" size={24} />
          <h1>Contas a receber</h1>
        </div>
        <Button asChild>
          <Link to={Routes.accountReceivableRegister}>
            <Icon name="Plus" size={20} />
            Nova conta
          </Link>
        </Button>
      </header>
      <DataTable
        data={accountReceivables}
        columns={{
          patientName: {
            header: 'Nome do paciente',
          },
          operationPerformed: {
            header: 'Operação realizada',
          },
          amount: {
            header: 'Valor',
            transform: (value) => value,
          },
          paymentMethod: {
            header: 'Método de pagamento',
            transform: (value) => PaymentMethodMap[value],
          },
          issuanceDate: {
            header: 'Data de emissão',
            transform: (value) => new Date(value).toLocaleDateString(),
          },
        }}
        keyExtractor={(row) => row.id}
        actionColumn={{
          edit: (row) => Routes.accountReceivableEdit(row.id),
          delete: (row) => handleDelete(row),
        }}
        emptyMessage="Sem contas a receber cadastradas"
      />
    </ContainerLayout>
  )
}
