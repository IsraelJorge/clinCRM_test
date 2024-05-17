import { Link } from 'react-router-dom'

import {
  AccountReceivable,
  AccountReceivableSchema,
} from '@/data/schemas/AccountReceivable'

import { Form } from './form'
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
      {({ register, formState: { errors } }) => (
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
