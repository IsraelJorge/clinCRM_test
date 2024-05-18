export const getLocalStorageValue = <T>(key: string, initialValue?: T): T => {
  const savedValue = localStorage.getItem(key)
  if (savedValue) {
    return JSON.parse(savedValue)
  }
  return initialValue || ([] as T)
}

export const setValueLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}
