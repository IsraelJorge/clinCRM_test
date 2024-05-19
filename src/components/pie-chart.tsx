import { useEffect, useState } from 'react'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

import { TotaisAccountReceivable } from '@/contexts/account-receivable-context'
import { AccountReceivable } from '@/data/schemas/AccountReceivable'
import {
  MonthAndYearSearch,
  MonthAndYearSearchSchema,
} from '@/data/schemas/MonthSearch'
import { PaymentMethod } from '@/data/schemas/PaymentMethod'
import { AccountReceivableStorage } from '@/data/storage/account-receivable-storage'
import { calculateTotalByPaymentMethod } from '@/utils/calculateTotalByPaymentMethod'
import { filterAccountReceivableByMonthAndYear } from '@/utils/filterAccountReceivableByMonthAndYear'
import { generateYearOptions } from '@/utils/generateYearOptions'
import { monthOptions } from '@/utils/monthOptions'
import { PaymentMethodMap } from '@/utils/PaymentMethodMap'

import { Form } from './form'
import { SelectData } from './select-data'
import { Button } from './ui/button'

ChartJS.register(ArcElement, Tooltip, Legend)

export type PieChartProps = {
  accountReceivables: AccountReceivable[]
  onTotaisAccountReceivableUpdate: (data: TotaisAccountReceivable) => void
}

const options: ChartOptions<'pie'> = {
  responsive: true,
  aspectRatio: 2,
}

export function PieChart({
  accountReceivables,
  onTotaisAccountReceivableUpdate,
}: PieChartProps) {
  const [accountReceivablesFiltered, setAccountReceivablesFiltered] =
    useState(accountReceivables)

  const totalReceivableByPaymentMethods = calculateTotalByPaymentMethod(
    accountReceivablesFiltered,
  )

  const paymentMethodsLabels = Object.keys(totalReceivableByPaymentMethods).map(
    (label) => PaymentMethodMap[label as PaymentMethod],
  )

  const paymentMethodsValues = Object.values(totalReceivableByPaymentMethods)

  const data: ChartData<'pie'> = {
    labels: paymentMethodsLabels,
    datasets: [
      {
        data: paymentMethodsValues,
        backgroundColor: [
          'hsl(346.8, 77.2%, 49.8%, 0.5)',
          'hsl(221.2, 83.2%, 53.3%, 0.5)',
          'hsl(142.1, 76.2%, 36.3%, 0.5)',
          'hsl(24.6, 95%, 53.1%, 0.5)',
          'hsl(262.1, 83.3%, 57.8%, 0.5)',
        ],
        borderColor: [
          'hsl(346.8, 77.2%, 49.8%)',
          'hsl(221.2, 83.2%, 53.3%)',
          'hsl(142.1 76.2% 36.3%)',
          'hsl(24.6 95% 53.1%)',
          'hsl(262.1 83.3% 57.8%)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const yearsOptions = generateYearOptions()

  const handleFilterByMonth = (data: MonthAndYearSearch) => {
    const dataFiltered = filterAccountReceivableByMonthAndYear(
      accountReceivables,
      data,
    )
    setAccountReceivablesFiltered(dataFiltered)
  }

  useEffect(() => {
    const totais = AccountReceivableStorage.calculateTotaisAccountReceivable(
      accountReceivablesFiltered,
    )

    onTotaisAccountReceivableUpdate(totais)
  }, [accountReceivablesFiltered])

  return (
    <>
      <div>
        <Form schema={MonthAndYearSearchSchema} onSubmit={handleFilterByMonth}>
          {({ control, formState: { errors } }) => (
            <div className="flex gap-2">
              <SelectData
                placeholder="Mês"
                name="month"
                data={monthOptions}
                displayKey="label"
                valueKey="value"
                control={control}
              >
                <SelectData.Error message={errors.month?.message} />
              </SelectData>

              <SelectData
                placeholder="Ano"
                name="year"
                data={yearsOptions}
                displayKey="label"
                valueKey="value"
                control={control}
              >
                <SelectData.Error message={errors.year?.message} />
              </SelectData>

              <Button type="submit">Filtrar</Button>
            </div>
          )}
        </Form>
      </div>
      <div className="flex h-full flex-auto items-center justify-center">
        <Pie data={data} className="aspect-square" options={options} />
      </div>
    </>
  )
}
