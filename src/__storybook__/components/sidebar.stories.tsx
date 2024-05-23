import { Meta } from '@storybook/react'

import { Sidebar } from '@/components/sidebar'

export default {
  title: 'components/sidebar',
  component: Sidebar,
} as Meta<typeof Sidebar>

export const Default = () => <Sidebar />
