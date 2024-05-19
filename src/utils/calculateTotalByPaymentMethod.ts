import { AccountReceivable } from '@/data/schemas/AccountReceivable'
import { PaymentMethod } from '@/data/schemas/PaymentMethod'

import { PriceHelper } from './PriceHelper'

type TotalByPaymentMethod = {
  [key in PaymentMethod]: number
}

export const calculateTotalByPaymentMethod = (data: AccountReceivable[]) => {
  const totalByPaymentMethod = data.reduce((acc, item) => {
    const { paymentMethod } = item
    const amount = PriceHelper.convertToNumber(item.amount)

    acc[paymentMethod] = acc[paymentMethod]
      ? (acc[paymentMethod] += amount)
      : amount
    return acc
  }, {} as TotalByPaymentMethod)
  return totalByPaymentMethod
}
