import { DateHelper } from './DateHelper'

type YearOption = {
  label: string
  value: string
}

export function generateYearOptions(
  startYear: number = 1900,
  endYear?: number,
): YearOption[] {
  const currentYear = new Date().getFullYear()
  const finalYear = endYear || currentYear
  const yearOptions: YearOption[] = []

  for (let year = startYear; year <= finalYear; year++) {
    yearOptions.push({
      label: DateHelper.format({ value: new Date(year, 0, 1), format: 'yyyy' }),
      value: new Date(year, 0, 1).toISOString(),
    })
  }

  return yearOptions.reverse()
}
