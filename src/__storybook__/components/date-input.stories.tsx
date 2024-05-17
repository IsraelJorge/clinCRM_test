import { Meta, StoryObj } from '@storybook/react'

import { DateInput, DateInputErrorProps } from '@/components/date-input'
import { Form } from '@/components/form'
import { AccountReceivableSchema } from '@/data/schemas/AccountReceivable'

export default {
  title: 'components/DateInput',
  component: DateInput,
} as Meta<typeof DateInput>

const DateInputTemplate = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Form schema={AccountReceivableSchema}>
      {({ control }) => (
        <DateInput
          name="issuanceDate"
          placeholder="Data de emissão"
          defaultValue={new Date()}
          control={control}
        >
          {children}
        </DateInput>
      )}
    </Form>
  )
}

export const Default = () => <DateInputTemplate />

type StoryWithError = StoryObj<DateInputErrorProps>

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
    <DateInputTemplate>
      <DateInput.Error {...args} />
    </DateInputTemplate>
  ),
}
