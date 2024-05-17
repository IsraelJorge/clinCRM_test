import { z } from 'zod'

import { Error } from '@/data/errors'
import { PriceHelper } from '@/utils/PriceHelper'

import { PaymentMethodSchema } from './PaymentMethod'

export const AccountReceivableSchema = z.object({
  id: z.string(),
  patientName: z.string(),
  operationPerformed: z.string(),
  amount: z
    .string()
    .or(z.number())
    .transform((value) => PriceHelper.formatCurrency(value)),
  paymentMethod: PaymentMethodSchema,
  issuanceDate: z.coerce.date(),
})

export type AccountReceivable = z.infer<typeof AccountReceivableSchema>

export const AccountReceivableFormSchema = z.object({
  id: z.string().optional(),
  patientName: z
    .string({ required_error: Error.required })
    .min(3, Error.min(3)),
  operationPerformed: z
    .string({ required_error: Error.required })
    .min(3, Error.min(3)),
  amount: z
    .string()
    .min(1, Error.min(1))
    .or(z.number())
    .transform((value) => PriceHelper.convertToNumber(value)),
  paymentMethod: PaymentMethodSchema.refine((value) => !!value, {
    message: Error.selectLeastOneOption,
  }),
  issuanceDate: z.date({
    required_error: Error.required,
    invalid_type_error: Error.date,
    message: Error.date,
  }),
})

export type AccountReceivableForm = z.infer<typeof AccountReceivableFormSchema>
