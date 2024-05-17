import { z } from 'zod'

import { Error } from '../errors'

export const PaymentMethodSchema = z.enum(
  ['credit_card', 'debit_card', 'cash', 'pix', 'billet'],
  {
    required_error: Error.required,
  },
)

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>
