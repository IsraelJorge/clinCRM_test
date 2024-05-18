import { useTheme } from '@/contexts/theme-context'

import { Icon } from '../icon'
import { Button } from './button'

export function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      className="rounded-full"
      size="icon"
      variant="ghost"
    >
      <Icon name={theme === 'light' ? 'Sun' : 'MoonStar'} size={20} />
    </Button>
  )
}
