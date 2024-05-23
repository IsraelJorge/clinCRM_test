import { useState } from 'react'

import { DashboardCardProps } from '@/components/dashboard-card'
import { DashboardCardList } from '@/components/dashboard-card-list'
import { ContainerLayout } from '@/components/layouts/container-layout'
import { LineChart } from '@/components/line-chart'
import { PieChart } from '@/components/pie-chart'
import { Card } from '@/components/ui/card'
import { useAccountReceivable } from '@/contexts/account-receivable-context'
import { PriceHelper } from '@/utils/PriceHelper'

export function Dashboard() {
  const { accountReceivables, totaisAccountReceivable } = useAccountReceivable()

  const [totaisAccountReceivableFiltered, setTotaisAccountReceivableFiltered] =
    useState(totaisAccountReceivable)

  const dashboardCardListData: DashboardCardProps[] = [
    {
      title: 'Total a receber',
      iconName: 'PieChart',
      value: PriceHelper.formatCurrency(
        totaisAccountReceivableFiltered.totalReceivable,
      ),
      info: `Últimos ${totaisAccountReceivableFiltered.totalDates} dias`,
    },
    {
      title: 'Total de pacientes',
      iconName: 'User',
      value: totaisAccountReceivableFiltered.totalPatients.toString(),
      info: `Últimos ${totaisAccountReceivableFiltered.totalDates} dias`,
    },
    {
      title: 'Total de atendimentos',
      iconName: 'Calendar',
      value: totaisAccountReceivableFiltered.totalOperations.toString(),
      info: `Últimos ${totaisAccountReceivableFiltered.totalDates} dias`,
    },
  ]

  return (
    <ContainerLayout>
      <div className="py-5">
        <DashboardCardList dashboardCards={dashboardCardListData} />
      </div>
      <div className="flex h-[30rem] flex-wrap gap-2">
        <Card className="h-full flex-1 p-4">
          <LineChart
            accountReceivables={accountReceivables}
            onTotaisAccountReceivableUpdate={setTotaisAccountReceivableFiltered}
          />
        </Card>
        <Card className="flex flex-1 flex-col p-4">
          <PieChart
            accountReceivables={accountReceivables}
            onTotaisAccountReceivableUpdate={setTotaisAccountReceivableFiltered}
          />
        </Card>
      </div>
    </ContainerLayout>
  )
}
