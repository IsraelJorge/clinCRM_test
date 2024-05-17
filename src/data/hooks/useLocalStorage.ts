import { useCallback, useState } from 'react'

export const useLocalStorage = () => {
  const [refreshLocalStorage, setRefreshLocalStorage] = useState(false)

  const onRefreshLocalStorage = () => setRefreshLocalStorage((prev) => !prev)

  const getLocalStorageValue = useCallback(
    <T>(key: string, initialValue: T[] = []): T[] => {
      const savedValue = localStorage.getItem(key)
      if (savedValue) {
        return JSON.parse(savedValue)
      }
      return initialValue
    },
    [refreshLocalStorage],
  )

  const setValueLocalStorage = useCallback(<T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [])

  return {
    getLocalStorageValue,
    setValueLocalStorage,
    onRefreshLocalStorage,
    refreshLocalStorage,
  }
}
