import { ComponentPropsWithoutRef } from 'react'

import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
} from 'react-hook-form'

import {
  Select as SelectContainer,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import {
  ChildrenError,
  checkChildrenHasError,
} from '@/utils/checkChildrenHasError'

import { Icon } from './icon'

export type SelectDataProps<
  Data extends Record<string, unknown>,
  TFields extends FieldValues,
  DisplayKey = keyof Data,
  ValueKey = keyof Data,
> = {
  data: Data[]
  placeholder?: string
  name: Path<TFields>
  control: Control<TFields>
  displayKey: DisplayKey
  valueKey?: ValueKey
  defaultValue?: PathValue<TFields, Path<TFields>>
  noMargin?: boolean
} & ComponentPropsWithoutRef<typeof SelectTrigger>

function SelectDataRoot<
  Data extends Record<string, unknown>,
  TFields extends FieldValues,
>({
  children,
  className,
  noMargin,
  control,
  name,
  defaultValue,
  displayKey,
  valueKey = 'id',
  data,
  placeholder,
  disabled,
  ...props
}: SelectDataProps<Data, TFields>) {
  const hasError = checkChildrenHasError(children as ChildrenError)

  const { field } = useController({ name, control, defaultValue, disabled })

  return (
    <div
      className={cn('select-root w-full', className, {
        'select-error': hasError,
        'pb-5': !noMargin,
      })}
    >
      <SelectContainer
        onValueChange={field.onChange}
        disabled={field.disabled}
        value={field.value}
        defaultValue={defaultValue}
        name={name}
      >
        <div className="relative">
          <SelectTrigger
            className={cn({
              '[&_span]:text-muted-foreground': !field.value,
            })}
            {...props}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          {!!field.value && (
            <Icon
              name="X"
              size={16}
              className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer text-destructive"
              onClick={() => {
                field.onChange(null)
              }}
            />
          )}
        </div>
        <SelectContent>
          <SelectGroup>
            {data.map((item) => {
              const value = String(item[valueKey])
              const label = String(item[displayKey])
              return (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </SelectContainer>
      {children}
    </div>
  )
}

export type SelectDataErrorProps = React.ComponentProps<'span'> & {
  message?: string
}

const SelectDataError = ({
  message,
  className,
  ...props
}: SelectDataErrorProps) => {
  return (
    <span className={cn('text-xs text-red-500', className)} {...props}>
      {message}
    </span>
  )
}

export const SelectData = Object.assign(SelectDataRoot, {
  Error: SelectDataError,
})
