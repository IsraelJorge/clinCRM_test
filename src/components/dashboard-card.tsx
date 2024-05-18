import { Icon, IconName } from './icon'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export type DashboardCardProps = {
  title: string
  iconName: IconName
  value: string
  info: string
}

export function DashboardCard({
  title,
  iconName,
  value,
  info,
}: DashboardCardProps) {
  return (
    <Card className="flex-1 rounded-xl border bg-background text-card-foreground shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <CardTitle className="text-sm font-medium tracking-tight">
          {title}
        </CardTitle>
        <Icon name={iconName} size={20} />
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{info}</p>
      </CardContent>
    </Card>
  )
}
