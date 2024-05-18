import { DashboardCard, DashboardCardProps } from './dashboard-card'

export type DashboardCardListProps = {
  dashboardCards: DashboardCardProps[]
}

export function DashboardCardList({ dashboardCards }: DashboardCardListProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {dashboardCards.map((card, index) => (
        <DashboardCard key={index + card.title + card.value} {...card} />
      ))}
    </div>
  )
}
