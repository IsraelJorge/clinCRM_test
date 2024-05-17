import { PaymentMethod } from '@/data/schemas/PaymentMethod'

type PaymentMethodMap = { [key in PaymentMethod]: string }

export const PaymentMethodMap: PaymentMethodMap = {
  credit_card: 'Cartão de crédito',
  debit_card: 'Cartão de débito',
  pix: 'Pix',
  cash: 'Dinheiro',
  billet: 'Boleto',
}
