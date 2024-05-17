import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { paymentMethodOptions } from '@/__mocks__/payment-method-options'
import { Form } from '@/components/form'
import { SelectData, SelectDataErrorProps } from '@/components/select-data'
import { AccountReceivableSchema } from '@/data/schemas/AccountReceivable'

export default {
  title: 'components/SelectData',
  component: SelectData,
} as Meta<typeof SelectData>

const SelectTemplate = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Form schema={AccountReceivableSchema}>
      {({ control }) => (
        <SelectData
          data={paymentMethodOptions}
          name="paymentMethod"
          placeholder="Método de pagamento"
          displayKey="label"
          valueKey="value"
          control={control}
        >
          {children}
        </SelectData>
      )}
    </Form>
  )
}

export const Default = () => <SelectTemplate />

type StoryWithError = StoryObj<SelectDataErrorProps>

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
    <SelectTemplate>
      <SelectData.Error {...args} />
    </SelectTemplate>
  ),
}
