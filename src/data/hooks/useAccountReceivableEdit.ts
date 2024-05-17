import {
  AccountReceivable,
  AccountReceivableForm,
  AccountReceivableFormSchema,
} from '../schemas/AccountReceivable'
import { useLocalStorage } from './useLocalStorage'

const keyStorage = 'accountReceivable'

export const useAccountReceivableEdit = () => {
  const { getLocalStorageValue, setValueLocalStorage } = useLocalStorage()

  const update = (data: AccountReceivableForm) => {
    const result = AccountReceivableFormSchema.safeParse(data)
    if (!result.success) {
      throw new Error('Invalid data')
    }

    const accountReceivable =
      getLocalStorageValue<AccountReceivable>(keyStorage)

    setValueLocalStorage(
      keyStorage,
      accountReceivable.map((item) =>
        item?.id === data.id ? { ...result.data, id: data.id } : item,
      ),
    )
  }

  return {
    update,
  }
}
