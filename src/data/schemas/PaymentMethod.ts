import { z } from 'zod'

export const PaymentMethodSchema = z.enum([
  'credit_card',
  'debit_card',
  'cash',
  'pix',
  'billet',
])

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>
