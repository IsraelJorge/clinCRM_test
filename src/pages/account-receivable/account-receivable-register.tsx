import { AccountReceivableForm } from '@/components/account-receivable-form'
import { ContainerLayout } from '@/components/layouts/container-layout'

export function AccountReceivableRegister() {
  return (
    <ContainerLayout>
      <Header />
      <AccountReceivableForm />
    </ContainerLayout>
  )
}

const Header = () => {
  return (
    <header className="py-5">
      <h1>Nova Conta a receber</h1>
    </header>
  )
}
