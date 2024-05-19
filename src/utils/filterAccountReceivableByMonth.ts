import { AccountReceivable } from '@/data/schemas/AccountReceivable'

export const filterAccountReceivableByMonth = (
  data: AccountReceivable[],
  month: number,
) => {
  return data.filter(
    (item) =>
      item.issuanceDate.getMonth() === month &&
      item.issuanceDate.getFullYear() === new Date().getFullYear(),
  )
}
