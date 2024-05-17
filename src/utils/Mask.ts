export const Mask = {
  currency: (value: string) => {
    if (!value) return ''

    const maskedValue = value
      .replace(/\D/g, '')
      .replace(/(\d{1,2})$/, ',$1')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

    return maskedValue
  },
  name: (value: string) => {
    if (!value) return ''

    const maskedValue = value.replace(/[^a-zA-Z\s]/g, '')

    return maskedValue
  },
}
