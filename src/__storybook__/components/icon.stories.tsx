import { Meta } from '@storybook/react'

import { Icon, IconName, IconProps } from '@/components/icon'

const iconsName: IconName[] = [
  'AArrowDown',
  'BadgeAlertIcon',
  'CableCarIcon',
  'FacebookIcon',
]

export default {
  title: 'components/icon',
  component: Icon,
  args: {
    name: 'AArrowDown',
  },
  argTypes: {
    name: {
      control: {
        type: 'select',
      },
      options: iconsName,
    },
  },
} as Meta<typeof Icon>

export const Default = (args: IconProps) => <Icon {...args} />
