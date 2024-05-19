import { faker } from '@faker-js/faker'

import { TotaisAccountReceivable } from '@/contexts/account-receivable-context'
import { DateHelper } from '@/utils/DateHelper'
import { getFirstAndLastDate } from '@/utils/getFirstAndLastDate'
import {
  getLocalStorageValue,
  setValueLocalStorage,
} from '@/utils/localStorage'
import { PriceHelper } from '@/utils/PriceHelper'

import {
  AccountReceivable,
  AccountReceivableForm,
  AccountReceivableFormSchema,
  AccountReceivableSchema,
} from '../schemas/AccountReceivable'

export const keyStorage = 'accountReceivable'

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

    const hasExist = newAccountsReceivable.find(
      (ac) =>
        DateHelper.format({ value: ac.issuanceDate }) ===
          DateHelper.format({ value: newAccount.issuanceDate }) &&
        ac.amount === newAccount.amount &&
        ac.operationPerformed === newAccount.operationPerformed &&
        ac.patientName === newAccount.patientName &&
        ac.paymentMethod === newAccount.paymentMethod &&
        ac.id !== newAccount.id,
    )

    if (!hasExist) setValueLocalStorage(keyStorage, newAccountsReceivable)

    const resultAccount = AccountReceivableSchema.parse({
      ...newAccount,
      id: hasExist?.id ?? newAccount.id,
    })

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
    try {
      const accountReceivable = getLocalStorageValue<AccountReceivable[]>(
        keyStorage,
      ).find((item) => item.id === id)

      const result = AccountReceivableSchema.parse(accountReceivable)

      return result
    } catch (error) {
      console.log(error)
    }
  },
  findAll: () => {
    const accountReceivables =
      getLocalStorageValue<AccountReceivable[]>(keyStorage)

    const result = AccountReceivableSchema.array().parse(accountReceivables)

    return result
  },
  calculateTotaisAccountReceivable: (
    accountReceivables: AccountReceivable[],
  ): TotaisAccountReceivable => {
    const totalReceivable = accountReceivables.reduce(
      (acc, item) => acc + PriceHelper.convertToNumber(item.amount),
      0,
    )

    const totalPatients = new Set(
      accountReceivables.map((item) => item.patientName),
    ).size

    const totalOperations = accountReceivables.length

    const { firstDate, lastDate } = getFirstAndLastDate(accountReceivables)

    const totalDates = DateHelper.differenceInDays(firstDate, lastDate)

    return {
      totalOperations,
      totalPatients,
      totalReceivable,
      totalDates,
    }
  },
}
