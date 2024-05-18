import { AccountReceivable } from '@/data/schemas/AccountReceivable'

export const orderAccountReceivableByDate = (data: AccountReceivable[]) => {
  return data.sort((a, b) => {
    return (
      new Date(a.issuanceDate).getTime() - new Date(b.issuanceDate).getTime()
    )
  })
}
