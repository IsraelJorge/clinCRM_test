import { faker } from '@faker-js/faker'

import { AccountReceivable } from '@/data/schemas/AccountReceivable'
import { PaymentMethodSchema } from '@/data/schemas/PaymentMethod'

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newAccountReceivable = (): AccountReceivable => {
  return {
    id: faker.string.uuid(),
    amount: faker.number.float({ min: 100, max: 10000, precision: 2 }),
    issuanceDate: faker.date.past(),
    operationPerformed: faker.lorem.words({ min: 6, max: 10 }),
    patientName: faker.person.fullName(),
    paymentMethod: faker.helpers.enumValue(PaymentMethodSchema.Enum),
  }
}

export function makeDataTable(lens: number) {
  return range(lens).map((): AccountReceivable => newAccountReceivable())
}
