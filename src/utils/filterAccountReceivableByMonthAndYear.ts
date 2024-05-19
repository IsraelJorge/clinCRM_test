import { AccountReceivable } from '@/data/schemas/AccountReceivable'
import { MonthAndYearSearch } from '@/data/schemas/MonthSearch'

import { filterAccountReceivableByMonth } from './filterAccountReceivableByMonth'
import { filterAccountReceivableByYear } from './filterAccountReceivableByYear'

export const filterAccountReceivableByMonthAndYear = (
  data: AccountReceivable[],
  monthSearch: MonthAndYearSearch,
) => {
  const { month, year } = monthSearch

  const hasMonth = month !== undefined && month !== null
  const hasYear = year !== undefined && year !== null

  if (hasMonth && !hasYear) return filterAccountReceivableByMonth(data, month)

  if (!hasMonth && hasYear) return filterAccountReceivableByYear(data, year)

  if (!hasMonth || !hasYear) return data

  return data.filter(
    (item) =>
      item.issuanceDate.getMonth() === month &&
      item.issuanceDate.getFullYear() === year.getFullYear(),
  )
}
