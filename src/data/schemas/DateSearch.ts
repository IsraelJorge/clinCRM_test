import { z } from 'zod'

export const DateSearchSchema = z.object({
  dataRange: z
    .object({
      from: z.date().nullish(),
      to: z.date().nullish(),
    })
    .default({ from: undefined, to: undefined }),
})

export type DateSearch = z.infer<typeof DateSearchSchema>
