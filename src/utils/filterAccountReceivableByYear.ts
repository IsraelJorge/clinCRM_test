import { AccountReceivable } from '@/data/schemas/AccountReceivable'

export const filterAccountReceivableByYear = (
  data: AccountReceivable[],
  year: Date,
) => {
  return data.filter(
    (item) => item.issuanceDate.getFullYear() === year.getFullYear(),
  )
}
