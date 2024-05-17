import { ptBR } from 'date-fns/locale/pt-BR'
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

export type DateInputProps<TFields extends FieldValues> = {
  placeholder?: string
  name: Path<TFields>
  control: Control<TFields>
  defaultValue?: PathValue<TFields, Path<TFields>>
  noMargin?: boolean
  children?: React.ReactNode
  disabled?: boolean
  className?: string
}

export function DateInputRoot<TFields extends FieldValues>({
  name,
  control,
  defaultValue,
  noMargin,
  placeholder,
  children,
  disabled,
  className,
}: DateInputProps<TFields>) {
  const hasError = checkChildrenHasError(children as ChildrenError)

  const { field } = useController({ name, control, defaultValue, disabled })

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
              DateHelper.format({ value: field.value })
            ) : (
              <span>{placeholder}</span>
            )}
            <Icon name="CalendarIcon" className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            locale={ptBR}
            selected={field.value ?? defaultValue}
            onSelect={field.onChange}
            disabled={(date) => date < new Date('1900-01-01')}
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
