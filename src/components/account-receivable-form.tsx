import { Link } from 'react-router-dom'

import { paymentMethodOptions } from '@/__mocks__/payment-method-options'
import {
  AccountReceivable,
  AccountReceivableFormSchema,
  AccountReceivableForm as AccountReceivableFormType,
} from '@/data/schemas/AccountReceivable'

import { DateInput } from './date-input'
import { Form } from './form'
import { SelectData } from './select-data'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { TextArea } from './ui/textarea'

export type AccountReceivableFormProps = {
  defaultValue?: AccountReceivable
  onSubmit: (data: AccountReceivableFormType) => void
}

export function AccountReceivableForm({
  defaultValue,
  onSubmit,
}: AccountReceivableFormProps) {
  const isEdit = Boolean(defaultValue?.id)

  return (
    <Form
      schema={AccountReceivableFormSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValue}
    >
      {({ register, formState: { errors }, control }) => {
        return (
          <section className="flex flex-col">
            <input
              type="hidden"
              className="hidden"
              {...register('id')}
              defaultValue={defaultValue?.id}
            />
            <div className="flex gap-2">
              <Input
                placeholder="Nome"
                mask="name"
                {...register('patientName')}
                defaultValue={defaultValue?.patientName}
              >
                <Input.Error message={errors.patientName?.message} />
              </Input>
              <Input
                placeholder="Valor"
                mask="currency"
                {...register('amount')}
                defaultValue={defaultValue?.amount}
              >
                <Input.Error message={errors.amount?.message} />
              </Input>
            </div>
            <div className="flex gap-2">
              <SelectData
                data={paymentMethodOptions}
                name="paymentMethod"
                placeholder="Método de pagamento"
                displayKey="label"
                valueKey="value"
                className="flex-1"
                control={control}
                defaultValue={defaultValue?.paymentMethod}
              >
                <SelectData.Error message={errors?.paymentMethod?.message} />
              </SelectData>

              <DateInput
                placeholder="Data de emissão"
                name="issuanceDate"
                className="flex-1"
                control={control}
                defaultValue={defaultValue?.issuanceDate}
              >
                <DateInput.Error message={errors.issuanceDate?.message} />
              </DateInput>
            </div>
            <div>
              <TextArea
                placeholder="Operação realizada"
                {...register('operationPerformed')}
                defaultValue={defaultValue?.operationPerformed}
              >
                <TextArea.Error message={errors.operationPerformed?.message} />
              </TextArea>
            </div>
            <div className="flex justify-between">
              <Button variant="destructive" asChild>
                <Link to="..">Cancelar</Link>
              </Button>
              <Button type="submit">
                {isEdit ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </div>
          </section>
        )
      }}
    </Form>
  )
}
