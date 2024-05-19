import {
  differenceInDays as diffInDays,
  format as formatFn,
  isValid,
  parse,
  parseISO,
} from 'date-fns'
import * as dfLocales from 'date-fns/locale'

const locales = { en: dfLocales.enUS, pt: dfLocales.ptBR }

type LanguageType = 'pt'

interface FormatParams {
  value: Date | undefined | string | null
  format?: string
  language?: LanguageType
}

export const DateHelper = {
  format({ value, language = 'pt', format = 'P' }: FormatParams) {
    if (!value) return ''
    const date =
      typeof value === 'string' ? value : (value as Date).toISOString()

    try {
      const locale = locales[language]

      let dateObj = parseISO(date)

      if (date.includes('T00:00:00.000Z')) {
        const dateArray = date
          .split('T')[0]
          .split('-')
          .map((d) => Number(d))
        dateObj = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
      }

      return formatFn(dateObj, format, { locale })
    } catch (e) {
      return date.toString()
    }
  },
  parseDate(value: string | undefined | null, format = 'dd/MM/yyyy') {
    if (!value) return null

    try {
      return parse(value, format, new Date())
    } catch (e) {
      return null
    }
  },
  parseISOString(value: string | undefined | null) {
    if (!value) return null

    try {
      return parseISO(value)
    } catch (e) {
      return null
    }
  },
  differenceInDays(startDate: Date, endDate: Date) {
    return diffInDays(endDate, startDate)
  },
  isValidDate(date: Date | null) {
    return isValid(date)
  },
}
