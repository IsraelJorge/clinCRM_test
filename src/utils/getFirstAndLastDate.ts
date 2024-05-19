import { AccountReceivable } from '@/data/schemas/AccountReceivable'

import { orderAccountReceivableByDate } from './orderAccountReceivableByDate'

export const getFirstAndLastDate = (data: AccountReceivable[]) => {
  const sortedData = orderAccountReceivableByDate(data)
  const firstDate = sortedData[0].issuanceDate
  const lastDate = sortedData[sortedData.length - 1].issuanceDate

  return { firstDate, lastDate }
}
