import {
  AccountReceivable,
  AccountReceivableSchema,
} from '@/data/schemas/AccountReceivable'

import { Form } from './form'
import { Input } from './ui/input'

export type AccountReceivableFormProps = {
  defaultValue?: AccountReceivable
}

export function AccountReceivableForm({
  defaultValue,
}: AccountReceivableFormProps) {
  return (
    <Form schema={AccountReceivableSchema} defaultValues={defaultValue}>
      {({ register, formState: { errors } }) => (
        <section className="flex flex-col">
          <input
            type="hidden"
            className="hidden"
            {...register('id')}
            defaultValue={defaultValue?.id}
          />
          <div className="flex gap-1">
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
            <Input
              placeholder="Método de pagamento"
              {...register('paymentMethod')}
              defaultValue={defaultValue?.paymentMethod}
            >
              <Input.Error message={errors.paymentMethod?.message} />
            </Input>
            <Input
              placeholder="Data de emissão"
              {...register('issuanceDate')}
              defaultValue={defaultValue?.issuanceDate}
            >
              <Input.Error message={errors.issuanceDate?.message} />
            </Input>
          </div>
          <div>
            <Input
              placeholder="Operação realizada"
              {...register('operationPerformed')}
              defaultValue={defaultValue?.operationPerformed}
            >
              <Input.Error message={errors.operationPerformed?.message} />
            </Input>
          </div>
        </section>
      )}
    </Form>
  )
}
