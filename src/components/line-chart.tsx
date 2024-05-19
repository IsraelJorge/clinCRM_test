import { useEffect, useState } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartData,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import { TotaisAccountReceivable } from '@/contexts/account-receivable-context'
import { AccountReceivable } from '@/data/schemas/AccountReceivable'
import { DateSearch, DateSearchSchema } from '@/data/schemas/DateSearch'
import { AccountReceivableStorage } from '@/data/storage/account-receivable-storage'
import { calculateTotalPerDay } from '@/utils/calculateTotalPerDay'
import { filterAccountReceivableBetweenDates } from '@/utils/filterAccountReceivableBetweenDates'
import { orderAccountReceivableByDate } from '@/utils/orderAccountReceivableByDate'

import { DateInput } from './date-input'
import { Form } from './form'
import { Button } from './ui/button'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
)

const options = {
  responsive: true,
}

export type LineChartProps = {
  accountReceivables: AccountReceivable[]
  onTotaisAccountReceivableUpdate: (data: TotaisAccountReceivable) => void
}

export function LineChart({
  accountReceivables,
  onTotaisAccountReceivableUpdate,
}: LineChartProps) {
  const [accountReceivablesFiltered, setAccountReceivablesFiltered] =
    useState(accountReceivables)

  const accountReceivablesOrdered = orderAccountReceivableByDate(
    accountReceivablesFiltered,
  )
  const totalPerDay = calculateTotalPerDay(accountReceivablesOrdered)

  const datesLabel = Object.keys(totalPerDay)
  const dataLine = Object.values(totalPerDay)

  const handleFilterBetweenDates = (data: DateSearch) => {
    const accountReceivablesFiltered = filterAccountReceivableBetweenDates(
      accountReceivables,
      data,
    )

    setAccountReceivablesFiltered(accountReceivablesFiltered)
  }

  const data: ChartData<'line'> = {
    labels: datesLabel,
    datasets: [
      {
        label: 'Faturamento por dia',
        fill: true,
        data: dataLine,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  useEffect(() => {
    const totais = AccountReceivableStorage.calculateTotaisAccountReceivable(
      accountReceivablesFiltered,
    )

    onTotaisAccountReceivableUpdate(totais)
  }, [accountReceivablesFiltered])

  return (
    <div className="flex h-full flex-col">
      <div>
        <Form schema={DateSearchSchema} onSubmit={handleFilterBetweenDates}>
          {({ control, formState: { errors } }) => (
            <div className="flex gap-2">
              <DateInput
                name="dataRange"
                mode="range"
                placeholder="Filtre pelo período"
                control={control}
              >
                <DateInput.Error
                  message={
                    errors.dataRange?.from?.message ||
                    errors.dataRange?.to?.message
                  }
                />
              </DateInput>
              <Button type="submit">Filtrar</Button>
            </div>
          )}
        </Form>
      </div>
      <div className="flex h-full flex-auto items-center justify-center">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
