import { useEffect, useState } from 'react'

import {
  AccountReceivable,
  AccountReceivableSchema,
} from '../schemas/AccountReceivable'
import { useLocalStorage } from './useLocalStorage'

const keyStorage = 'accountReceivable'

export const useAccountReceivableGet = (id: string) => {
  const [accountReceivable, setAccountReceivable] =
    useState<AccountReceivable>()

  const { getLocalStorageValue } = useLocalStorage()

  const get = (id: string) => {
    const accountReceivable = getLocalStorageValue<AccountReceivable>(
      keyStorage,
    ).find((item) => item.id === id)

    const result = AccountReceivableSchema.parse(accountReceivable)

    return result
  }

  useEffect(() => {
    setAccountReceivable(get(id))
  }, [getLocalStorageValue])

  return {
    accountReceivable,
  }
}
