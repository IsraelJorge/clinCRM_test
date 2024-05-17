import { useEffect, useState } from 'react'

import {
  AccountReceivable,
  AccountReceivableSchema,
} from '../schemas/AccountReceivable'
import { useLocalStorage } from './useLocalStorage'

const keyStorage = 'accountReceivable'

export const useAccountReceivableFindAll = () => {
  const [accountReceivables, setAccountReceivables] = useState<
    AccountReceivable[]
  >([])

  const { getLocalStorageValue } = useLocalStorage()

  const findAll = () => {
    const accountReceivables =
      getLocalStorageValue<AccountReceivable>(keyStorage)

    const result = AccountReceivableSchema.array().parse(accountReceivables)

    return result
  }

  useEffect(() => {
    setAccountReceivables(findAll())
  }, [getLocalStorageValue])

  return {
    accountReceivables,
  }
}
