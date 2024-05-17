import { Meta, StoryObj } from '@storybook/react'

import { TextArea, TextAreaErrorProps } from '@/components/ui/textarea'

export default {
  title: 'components/TextArea',
  component: TextArea,
} as Meta<typeof TextArea>

export const Default = () => <TextArea placeholder="Sobre" />

type StoryWithError = StoryObj<TextAreaErrorProps>

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
    <TextArea placeholder="Sobre">
      <TextArea.Error {...args} />
    </TextArea>
  ),
}
