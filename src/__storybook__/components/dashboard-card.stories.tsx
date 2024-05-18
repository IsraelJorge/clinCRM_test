import { Meta } from '@storybook/react'

import { DashboardCard, DashboardCardProps } from '@/components/dashboard-card'

const dashboardCardData = {
  title: 'Total Revenue',
  iconName: 'PieChart',
  value: '$1,204',
  info: 'Last 30 days',
}

export default {
  title: 'components/DashboardCard',
  component: DashboardCard,
  args: dashboardCardData,
  argTypes: {
    title: { control: 'text' },
    iconName: { control: 'text' },
    value: { control: 'text' },
    info: { control: 'text' },
  },
} as Meta<typeof DashboardCard>

export const Default = (args: DashboardCardProps) => <DashboardCard {...args} />
