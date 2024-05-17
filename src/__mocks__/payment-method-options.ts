import { PaymentMethod } from '@/data/schemas/PaymentMethod'
import { PaymentMethodMap } from '@/utils/PaymentMethodMap'

type PaymentMethodOption = {
  value: PaymentMethod
  label: string
}

export const paymentMethodOptions: PaymentMethodOption[] = [
  {
    value: 'credit_card',
    label: PaymentMethodMap['credit_card'],
  },
  {
    value: 'debit_card',
    label: PaymentMethodMap['debit_card'],
  },
  {
    value: 'pix',
    label: PaymentMethodMap['pix'],
  },
  {
    value: 'cash',
    label: PaymentMethodMap['cash'],
  },
  {
    value: 'billet',
    label: PaymentMethodMap['billet'],
  },
]
