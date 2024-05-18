export const PriceHelper = {
  formatCurrency: (value: number | string): string => {
    return `R$
    ${Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(PriceHelper.convertToNumber(value))}`
  },
  formatDecimal: (value: number | string): string => {
    return Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value))
  },
  convertToNumber: (value: string | number): number => {
    if (!value) return 0

    if (typeof value == 'number') return value
    if (typeof value !== 'string') return 0

    const valueNumber = parseFloat(
      value.replace(/[^\d,-]/g, '').replace(',', '.'),
    )

    if (Number.isNaN(valueNumber)) return 0

    return valueNumber
  },
}
