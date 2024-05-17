import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  ChildrenError,
  checkChildrenHasError,
} from '@/utils/checkChildrenHasError'
import { Mask } from '@/utils/Mask'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  noMargin?: boolean
  mask?: 'currency' | 'name'
}

const InputRoot = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, children, noMargin, onChange, mask, ...props }, ref) => {
    const hasError = checkChildrenHasError(children as ChildrenError)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = handleMask(e.target.value)
      e.target.value = value
      onChange?.(e)
    }

    const handleMask = (value: string) => {
      switch (mask) {
        case 'currency':
          return Mask.currency(value)
        case 'name':
          return Mask.name(value)
        default:
          return value
      }
    }

    return (
      <div
        className={cn('input-root', {
          'input-error': hasError,
          'pb-5': !noMargin,
        })}
      >
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          onChange={handleChange}
          {...props}
        />
        {children}
      </div>
    )
  },
)
InputRoot.displayName = 'InputRoot'

export type InputErrorProps = React.ComponentProps<'span'> & {
  message?: string
}

const InputError = ({ message, className, ...props }: InputErrorProps) => {
  return (
    <span className={cn('text-xs text-red-500', className)} {...props}>
      {message}
    </span>
  )
}

export const Input = Object.assign(InputRoot, { Error: InputError })
