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

import { DashboardCardProps } from '@/components/dashboard-card'
import { DashboardCardList } from '@/components/dashboard-card-list'
import { DateInput } from '@/components/date-input'
import { Form } from '@/components/form'
import { ContainerLayout } from '@/components/layouts/container-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAccountReceivable } from '@/contexts/account-receivable-context'
import { DateSearchSchema } from '@/data/schemas/DeteSearch'
import { calculateTotalPerDay } from '@/utils/calculateTotalPerDay'
import { orderAccountReceivableByDate } from '@/utils/orderAccountReceivableByDate'
import { PriceHelper } from '@/utils/PriceHelper'

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

export const options = {
  responsive: true,
}

export function Dashboard() {
  const { totaisAccountReceivable, accountReceivables } = useAccountReceivable()

  const dashboardCardListData: DashboardCardProps[] = [
    {
      title: 'Total a receber',
      iconName: 'PieChart',
      value: PriceHelper.formatCurrency(
        totaisAccountReceivable.totalReceivable,
      ),
      info: 'Últimos 30 dias',
    },
    {
      title: 'Total de pacientes',
      iconName: 'User',
      value: totaisAccountReceivable.totalPatients.toString(),
      info: 'Últimos 30 dias',
    },
    {
      title: 'Total de atendimentos',
      iconName: 'Calendar',
      value: totaisAccountReceivable.totalOperations.toString(),
      info: 'Últimos 30 dias',
    },
  ]

  const accountReceivablesOrdered =
    orderAccountReceivableByDate(accountReceivables)
  const totalPerDay = calculateTotalPerDay(accountReceivablesOrdered)

  const labels = Object.keys(totalPerDay)
  const dataLine = Object.values(totalPerDay)

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: '',
        fill: true,
        data: dataLine,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <ContainerLayout>
      <div className="py-5">
        <DashboardCardList dashboardCards={dashboardCardListData} />
      </div>
      <Card className="max-w-2xl p-4">
        <div>
          <Form schema={DateSearchSchema}>
            {({ control }) => (
              <div className="flex gap-2">
                <DateInput
                  name="startDate"
                  mode="range"
                  placeholder="Coloque intervalo de datas"
                  control={control}
                >
                  <DateInput.Error />
                </DateInput>
                <Button type="submit">Filtrar</Button>
              </div>
            )}
          </Form>
        </div>
        <Line data={data} options={options} />
      </Card>
    </ContainerLayout>
  )
}
