import { useState, useEffect } from 'react'

import { Breakpoint } from '@/@types'
import { Breakpoints } from '@/utils/ui/Breakpoints'

export const useBreakpoint = (): Breakpoint => {
  const isClientSide = typeof window !== 'undefined'
  const [screenWidth, setScreenWidth] = useState(
    isClientSide ? window.innerWidth : 0,
  )
  const resize = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    if (isClientSide) window.addEventListener('resize', resize)

    return () => {
      if (isClientSide) window.removeEventListener('resize', resize)
    }
  }, [isClientSide])

  if (screenWidth >= Breakpoints['2xl']) return '2xl'
  if (screenWidth >= Breakpoints.xl) return 'xl'
  if (screenWidth >= Breakpoints.lg) return 'lg'
  if (screenWidth >= Breakpoints.md) return 'md'
  return 'sm'
}
