import { AccountReceivable } from '@/data/schemas/AccountReceivable'

import { DateHelper } from './DateHelper'
import { PriceHelper } from './PriceHelper'

type TotalPerDay = {
  [key: string]: number
}

export const calculateTotalPerDay = (data: AccountReceivable[]) => {
  return data.reduce((acc, item) => {
    const key = DateHelper.format({ value: item.issuanceDate })
    const amount = PriceHelper.convertToNumber(item.amount)

    acc[key] = acc[key] ? acc[key] + amount : amount
    return acc
  }, {} as TotalPerDay)
}
