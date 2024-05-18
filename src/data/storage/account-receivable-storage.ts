import { faker } from '@faker-js/faker'

import { DateHelper } from '@/utils/DateHelper'
import {
  getLocalStorageValue,
  setValueLocalStorage,
} from '@/utils/localStorage'

import {
  AccountReceivable,
  AccountReceivableForm,
  AccountReceivableFormSchema,
  AccountReceivableSchema,
} from '../schemas/AccountReceivable'

const keyStorage = 'accountReceivable'

export const AccountReceivableStorage = {
  create: (data: AccountReceivableForm) => {
    const result = AccountReceivableFormSchema.safeParse(data)
    if (!result.success) {
      throw new Error('Invalid data')
    }

    const accountReceivable =
      getLocalStorageValue<AccountReceivable[]>(keyStorage)

    const newAccount = {
      ...result.data,
      id: faker.string.uuid(),
    }

    const newAccountsReceivable = [newAccount, ...accountReceivable]

    const hasExist = accountReceivable.find(
      (ac) =>
        DateHelper.format({ value: ac.issuanceDate }) ===
          DateHelper.format({ value: newAccount.issuanceDate }) &&
        ac.amount === newAccount.amount &&
        ac.operationPerformed === newAccount.operationPerformed &&
        ac.patientName === newAccount.patientName &&
        ac.paymentMethod === newAccount.paymentMethod,
    )

    if (!hasExist) setValueLocalStorage(keyStorage, newAccountsReceivable)

    const resultAccount = AccountReceivableSchema.parse(newAccount)

    return resultAccount
  },
  remove: (id: string) => {
    const accountReceivable =
      getLocalStorageValue<AccountReceivable[]>(keyStorage)

    const accountReceivableRemoved = accountReceivable.filter(
      (item) => item.id !== id,
    )

    setValueLocalStorage(keyStorage, accountReceivableRemoved)

    return accountReceivableRemoved
  },
  update: (data: AccountReceivableForm) => {
    const result = AccountReceivableFormSchema.safeParse(data)
    if (!result.success) {
      throw new Error('Invalid data')
    }

    const accountReceivable =
      getLocalStorageValue<AccountReceivable[]>(keyStorage)

    const accountReceivableUpdated = accountReceivable.map((item) =>
      item?.id === data.id ? { ...result.data, id: data.id } : item,
    )

    setValueLocalStorage(keyStorage, accountReceivableUpdated)

    const resultAccount = AccountReceivableSchema.array().parse(
      accountReceivableUpdated,
    )

    return resultAccount
  },
  get: (id: string) => {
    const accountReceivable = getLocalStorageValue<AccountReceivable[]>(
      keyStorage,
    ).find((item) => item.id === id)

    const result = AccountReceivableSchema.parse(accountReceivable)

    return result
  },
  findAll: () => {
    const accountReceivables =
      getLocalStorageValue<AccountReceivable[]>(keyStorage)

    const result = AccountReceivableSchema.array().parse(accountReceivables)

    return result
  },
}
