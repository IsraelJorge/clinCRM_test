import { ContainerLayout } from './layouts/container-layout'
import { ToggleThemeButton } from './ui/toggle-theme-button'

export function Header() {
  return (
    <header className="bg-card-foreground p-4 text-muted">
      <ContainerLayout className="flex items-center justify-between">
        <div className="text-2xl font-bold">ClinCRM</div>
        <ToggleThemeButton />
      </ContainerLayout>
    </header>
  )
}
