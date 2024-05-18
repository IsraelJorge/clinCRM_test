import { DashboardCard, DashboardCardProps } from './dashboard-card'

export type DashboardCardListProps = {
  dashboardCards: DashboardCardProps[]
}

export function DashboardCardList({ dashboardCards }: DashboardCardListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {dashboardCards.map((card, index) => (
        <DashboardCard key={index + card.title + card.value} {...card} />
      ))}
    </div>
  )
}
