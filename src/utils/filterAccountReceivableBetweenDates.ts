import { AccountReceivable } from '@/data/schemas/AccountReceivable'
import { DateSearch } from '@/data/schemas/DateSearch'

export const filterAccountReceivableBetweenDates = (
  data: AccountReceivable[],
  dateSearch: DateSearch,
) => {
  const { from, to } = dateSearch.dataRange

  if (!from || !to) return data

  return data.filter(
    (item) =>
      item.issuanceDate.getTime() >= from.getTime() &&
      item.issuanceDate.getTime() <= to.getTime(),
  )
}
