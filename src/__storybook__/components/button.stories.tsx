import { Meta } from '@storybook/react'

import { Button, ButtonProps } from '@/components/ui/button'

const variants: ButtonProps['variant'][] = [
  'default',
  'destructive',
  'ghost',
  'link',
  'outline',
  'secondary',
]

const sizes: ButtonProps['size'][] = ['sm', 'icon', 'lg', 'default']

export default {
  title: 'components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: {
        type: 'select',
      },
      options: variants,
    },
    size: {
      control: {
        type: 'select',
      },
      options: sizes,
    },
    asChild: {
      table: { disable: true },
    },
  },
} as Meta<typeof Button>

export const Default = (args: ButtonProps) => <Button {...args} />
