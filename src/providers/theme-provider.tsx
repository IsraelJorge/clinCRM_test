import { createContext, useContext, useEffect, useState } from 'react'

import { getLocalStorageValue } from '@/utils/localStorage'

export type ThemeProviderProps = {
  children: React.ReactNode
}

type Theme = 'light' | 'dark'

type ThemeContextData = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeContextData['theme']>(() => {
    const storageTheme = getLocalStorageValue('theme', 'light')
    return storageTheme as Theme
  })

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider')
  }

  return context
}
