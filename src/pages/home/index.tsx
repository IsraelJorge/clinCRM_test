import { Link } from 'react-router-dom'

import { DashboardCardProps } from '@/components/dashboard-card'
import { DashboardCardList } from '@/components/dashboard-card-list'
import { DataTable } from '@/components/data-table'
import { Icon } from '@/components/icon'
import { ContainerLayout } from '@/components/layouts/container-layout'
import { Button } from '@/components/ui/button'
import { AccountReceivable } from '@/data/schemas/AccountReceivable'
import {
  Types,
  useAccountReceivable,
} from '@/providers/account-receivable-provider'
import { useDialog } from '@/providers/dialog-provider'
import { PaymentMethodMap } from '@/utils/PaymentMethodMap'
import { Routes } from '@/utils/ui/Routes'

export function Home() {
  const { showDialog } = useDialog()

  const { accountReceivables, dispatch } = useAccountReceivable()

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
            dispatch({ type: Types.REMOVE, payload: { id: data.id } })
          },
        },
      ],
    })
  }

  const dashboardCardListData: DashboardCardProps[] = [
    {
      title: 'Total Revenue',
      iconName: 'PieChart',
      value: '$1,204',
      info: 'Last 30 days',
    },
    {
      title: 'Total Patients',
      iconName: 'User',
      value: '204',
      info: 'Last 30 days',
    },
    {
      title: 'Total Appointments',
      iconName: 'Calendar',
      value: '204',
      info: 'Last 30 days',
    },
    {
      title: 'Total Procedures',
      iconName: 'Scale',
      value: '204',
      info: 'Last 30 days',
    },
  ]

  return (
    <ContainerLayout>
      <div className="py-5">
        <DashboardCardList dashboardCards={dashboardCardListData} />
      </div>

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
