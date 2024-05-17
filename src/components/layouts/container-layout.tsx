import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export type ContainerLayoutProps = ComponentProps<'div'> & {
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer'
}

export function ContainerLayout({
  as = 'div',
  className,
  children,
  ...props
}: ContainerLayoutProps) {
  const Element = as

  return (
    <Element
      className={cn('mx-auto w-full max-w-screen-2xl px-5', className)}
      {...props}
    >
      {children}
    </Element>
  )
}
