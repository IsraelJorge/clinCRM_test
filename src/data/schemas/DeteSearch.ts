import { z } from 'zod'

export const DateSearchSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
})
