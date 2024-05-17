import { Meta, StoryObj } from '@storybook/react'

import { Input, InputErrorProps } from '@/components/ui/input'

export default {
  title: 'components/Input',
  component: Input,
} as Meta<typeof Input>

export const Default = () => <Input placeholder="Nome" />

type StoryWithError = StoryObj<InputErrorProps>

export const WithError: StoryWithError = {
  args: {
    message: 'Campo obrigatório',
  },
  argTypes: {
    message: {
      control: {
        type: 'text',
      },
    },
  },
  render: (args) => (
    <Input placeholder="Nome">
      <Input.Error {...args} />
    </Input>
  ),
}
