import { ContainerLayout } from './layouts/container-layout'

export function Header() {
  return (
    <header className="bg-accent-foreground p-4 text-white">
      <ContainerLayout className="flex items-center justify-between">
        <div className="text-2xl font-bold">ClinCRM</div>
      </ContainerLayout>
    </header>
  )
}
