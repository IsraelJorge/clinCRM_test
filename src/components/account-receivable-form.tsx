import { Link } from 'react-router-dom'

import { paymentMethodOptions } from '@/__mocks__/payment-method-options'
import {
  AccountReceivable,
  AccountReceivableSchema,
} from '@/data/schemas/AccountReceivable'

import { Form } from './form'
import { SelectData } from './select-data'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { TextArea } from './ui/textarea'

export type AccountReceivableFormProps = {
  defaultValue?: AccountReceivable
}

export function AccountReceivableForm({
  defaultValue,
}: AccountReceivableFormProps) {
  const isEdit = Boolean(defaultValue?.id)

  return (
    <Form schema={AccountReceivableSchema} defaultValues={defaultValue}>
      {({ register, formState: { errors }, control }) => (
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
              {...register('patientName')}
              defaultValue={defaultValue?.patientName}
            >
              <Input.Error message={errors.patientName?.message} />
            </Input>
            <Input
              placeholder="Valor"
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

            <Input
              placeholder="Data de emissão"
              className="flex-1"
              {...register('issuanceDate')}
              defaultValue={defaultValue?.issuanceDate}
            >
              <Input.Error message={errors.issuanceDate?.message} />
            </Input>
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
            <Button type="submit">{isEdit ? 'Atualizar' : 'Cadastrar'}</Button>
          </div>
        </section>
      )}
    </Form>
  )
}
