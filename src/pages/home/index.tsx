import { Link } from 'react-router-dom'

import { makeDataTable } from '@/__mocks__/data-table-mock'
import { DataTable } from '@/components/data-table'
import { Icon } from '@/components/icon'
import { ContainerLayout } from '@/components/layouts/container-layout'
import { Button } from '@/components/ui/button'
import { PaymentMethodMap } from '@/utils/PaymentMethodMap'
import { PriceHelper } from '@/utils/PriceHelper'
import { Routes } from '@/utils/ui/Routes'

export function Home() {
  const accountReceivables = makeDataTable(10)

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
            transform: (value) => PriceHelper.formatCurrency(value),
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
          edit: (row) => {
            console.log('edit', row)
          },
          delete: (row) => {
            console.log('delete', row)
          },
        }}
      />
    </ContainerLayout>
  )
}
