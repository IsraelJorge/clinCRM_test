import { z } from 'zod'
import { PaymentMethodSchema } from './PaymentMethod'

export const AccountReceivableSchema = z.object({
  id: z.string(),
  patientName: z.string(),
  operationPerformed: z.string(),
  amount: z.number(),
  paymentMethod: PaymentMethodSchema,
  issuanceDate: z.date(),
})

export type AccountReceivable = z.infer<typeof AccountReceivableSchema>
