import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  ChildrenError,
  checkChildrenHasError,
} from '@/utils/checkChildrenHasError'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  noMargin?: boolean
}

const TextAreaRoot = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, children, noMargin, ...props }, ref) => {
    const hasError = checkChildrenHasError(children as ChildrenError)

    return (
      <div
        className={cn('textarea-root', {
          'textarea-error': hasError,
          'pb-5': !noMargin,
        })}
      >
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {children}
      </div>
    )
  },
)
TextAreaRoot.displayName = 'TextAreaRoot'

export type TextAreaErrorProps = React.ComponentProps<'span'> & {
  message?: string
}

const TextAreaError = ({
  message,
  className,
  ...props
}: TextAreaErrorProps) => {
  return (
    <span className={cn('text-xs text-red-500', className)} {...props}>
      {message}
    </span>
  )
}

export const TextArea = Object.assign(TextAreaRoot, { Error: TextAreaError })
