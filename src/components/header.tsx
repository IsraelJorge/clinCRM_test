import { ContainerLayout } from './layouts/container-layout'
import { ToggleThemeButton } from './ui/toggle-theme-button'

export function Header() {
  return (
    <header className="border-b border-border bg-card p-4 text-card-foreground shadow">
      <ContainerLayout className="flex items-center justify-between">
        <div className="text-2xl font-bold">ClinCRM</div>
        <ToggleThemeButton />
      </ContainerLayout>
    </header>
  )
}
