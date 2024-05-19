import { z } from 'zod'

import { DateHelper } from '@/utils/DateHelper'

export const MonthAndYearSearchSchema = z.object({
  month: z
    .string()
    .nullish()
    .transform((value) => (value ? Number(value) : null)),
  year: z
    .string()
    .nullish()
    .transform((value) => DateHelper.parseISOString(value)),
})

export type MonthAndYearSearch = z.infer<typeof MonthAndYearSearchSchema>
