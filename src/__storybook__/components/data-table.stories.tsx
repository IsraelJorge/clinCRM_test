import { Meta } from '@storybook/react'

import { makeDataTable } from '@/__mocks__/data-table-mock'
import { DataTable } from '@/components/data-table'
import { PaymentMethodMap } from '@/utils/PaymentMethodMap'
import { PriceHelper } from '@/utils/PriceHelper'

export default {
  title: 'components/DataTable',
  component: DataTable,
} as Meta<typeof DataTable>

const accountReceivables = makeDataTable(10)

export const Default = () => (
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
)
