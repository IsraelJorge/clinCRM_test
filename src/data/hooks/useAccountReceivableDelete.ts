import { AccountReceivable } from '../schemas/AccountReceivable'
import { useLocalStorage } from './useLocalStorage'

const keyStorage = 'accountReceivable'

export const useAccountReceivableDelete = () => {
  const { getLocalStorageValue, setValueLocalStorage } = useLocalStorage()

  const remove = (id: string) => {
    const accountReceivable =
      getLocalStorageValue<AccountReceivable>(keyStorage)

    setValueLocalStorage(
      keyStorage,
      accountReceivable.filter((item) => item.id !== id),
    )
  }

  return {
    remove,
  }
}
