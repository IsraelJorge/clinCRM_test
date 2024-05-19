import { useState } from 'react'

import { DashboardCardProps } from '@/components/dashboard-card'
import { DashboardCardList } from '@/components/dashboard-card-list'
import { ContainerLayout } from '@/components/layouts/container-layout'
import { LineChart } from '@/components/line-chart'
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
      <LineChart
        accountReceivables={accountReceivables}
        onTotaisAccountReceivableUpdate={setTotaisAccountReceivableFiltered}
      />
    </ContainerLayout>
  )
}
