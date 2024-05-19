import { useState } from 'react'

import { ptBR } from 'date-fns/locale/pt-BR'
import { DateRange, DaySelectionMode } from 'react-day-picker'
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
} from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  ChildrenError,
  checkChildrenHasError,
} from '@/utils/checkChildrenHasError'
import { DateHelper } from '@/utils/DateHelper'

import { Icon } from './icon'
import { Input } from './ui/input'

export type DateInputProps<TFields extends FieldValues> = {
  placeholder?: string
  name: Path<TFields>
  control: Control<TFields>
  defaultValue?: PathValue<TFields, Path<TFields>>
  noMargin?: boolean
  children?: React.ReactNode
  disabled?: boolean
  className?: string
  mode?: DaySelectionMode
  onChange?: (params?: DateParams) => void
  isInputSearch?: boolean
  inputProps?: React.ComponentProps<typeof Input>
}

type DateParams = Date | DateRange | Date[] | undefined

export function DateInputRoot<TFields extends FieldValues>({
  name,
  control,
  defaultValue,
  noMargin,
  placeholder,
  children,
  disabled,
  className,
  mode = 'single',
  onChange,
  isInputSearch = false,
  inputProps,
}: DateInputProps<TFields>) {
  const [inputValue, setInputValue] = useState('')

  const hasError = checkChildrenHasError(children as ChildrenError)

  const { field } = useController({ name, control, defaultValue, disabled })

  const handleChangeDate = (params?: DateParams) => {
    field.onChange(params)
    onChange?.(params)

    if (isInputSearch) {
      if (mode === 'single') {
        setInputValue(DateHelper.format({ value: params as Date }) ?? '')
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedDate = DateHelper.parseDate(e.target.value)

    if (DateHelper.isValidDate(parsedDate)) {
      if (mode === 'single') {
        handleChangeDate(parsedDate as DateParams)
      }
    }
    setInputValue(e.target.value)
  }

  const DisplayDateMap: { [key in DaySelectionMode]: () => string } = {
    single: () => DateHelper.format({ value: field.value }),
    range: () => {
      const date = field.value as DateRange
      const startDate = DateHelper.format({ value: date.from })
      const endDate = date.to
        ? ' - ' + DateHelper.format({ value: date.to })
        : ''
      return `${startDate}${endDate}`
    },
    multiple: () => {
      const dates = field.value as Date[]
      return dates.map((date) => DateHelper.format({ value: date })).join(', ')
    },
    default: () => DateHelper.format({ value: field.value }),
  }

  const DefaultMonthMap: { [key in DaySelectionMode]: () => Date | undefined } =
    {
      single: () => field.value,
      range: () => {
        const date = field.value as DateRange
        return date?.from
      },
      multiple: () => {
        const dates = field.value as Date[]
        return dates[0]
      },
      default: () => field.value,
    }

  return (
    <div
      className={cn('date-root flex w-full flex-col gap-1', className, {
        'date-error': hasError,
        'pb-5': !noMargin,
      })}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              'pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground',
            )}
          >
            {field.value ? (
              <span>{DisplayDateMap[mode]()}</span>
            ) : (
              <span>{placeholder}</span>
            )}
            <Icon name="CalendarIcon" className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {isInputSearch && (
            <div className="px-2 pt-3">
              <Input
                noMargin
                onChange={handleInputChange}
                value={inputValue}
                mask="date"
                {...inputProps}
              />
            </div>
          )}

          <Calendar
            mode={mode}
            locale={ptBR}
            selected={field.value ?? defaultValue}
            onSelect={handleChangeDate}
            disabled={(date) => date < new Date('1900-01-01')}
            defaultMonth={DefaultMonthMap[mode]()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {children}
    </div>
  )
}

export type DateInputErrorProps = React.ComponentProps<'span'> & {
  message?: string
}

const DateInputError = ({
  message,
  className,
  ...props
}: DateInputErrorProps) => {
  return (
    <span className={cn('text-xs text-red-500', className)} {...props}>
      {message}
    </span>
  )
}

export const DateInput = Object.assign(DateInputRoot, {
  Error: DateInputError,
})
