import { faker } from '@faker-js/faker'

import {
  AccountReceivable,
  AccountReceivableForm,
  AccountReceivableFormSchema,
} from '../schemas/AccountReceivable'
import { useLocalStorage } from './useLocalStorage'

const keyStorage = 'accountReceivable'

export const useAccountReceivableCreate = () => {
  const { getLocalStorageValue, setValueLocalStorage } = useLocalStorage()

  const create = (data: AccountReceivableForm) => {
    const result = AccountReceivableFormSchema.safeParse(data)
    if (!result.success) {
      throw new Error('Invalid data')
    }

    const accountReceivable =
      getLocalStorageValue<AccountReceivable>(keyStorage)

    const newAccountsReceivable = [
      ...accountReceivable,
      {
        ...result.data,
        id: faker.string.uuid(),
      },
    ].reverse()

    setValueLocalStorage(keyStorage, newAccountsReceivable)
  }

  return {
    create,
  }
}
