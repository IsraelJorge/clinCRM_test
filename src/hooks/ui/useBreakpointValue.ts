import { useEffect, useState } from 'react'

import { useBreakpoint } from './useBreakpoint'

type BreakpointValue<T> = {
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

interface UseBreakpointValueResponse<T> {
  getInitialValue: () => T | undefined
  value: T | undefined
  changeValue: (newValue: T) => void
  toggle: VoidFunction
}

export const useBreakpointValue = <T>(
  value: BreakpointValue<T>,
): UseBreakpointValueResponse<T> => {
  const breakpoint = useBreakpoint()

  const getValue = () => {
    switch (breakpoint) {
      case 'sm':
        return value.sm ?? value.md ?? value.lg ?? value.xl ?? value['2xl']
      case 'md':
        return value.md ?? value.sm ?? value.lg ?? value.xl ?? value['2xl']
      case 'lg':
        return value.lg ?? value.md ?? value.sm ?? value.xl ?? value['2xl']
      case 'xl':
        return value.xl ?? value.lg ?? value.md ?? value.sm ?? value['2xl']
      case '2xl':
        return value['2xl'] ?? value.xl ?? value.lg ?? value.md ?? value.sm
    }
  }

  const [state, setState] = useState<T | undefined>(undefined)

  useEffect(() => {
    onChange(getValue())
  }, [breakpoint])

  const onChange = (newValue: T | undefined) => {
    setState(newValue)
  }

  const onToggle = () => {
    if (typeof state === 'boolean') {
      setState((oldValue) => !oldValue as T)
    }
  }

  return {
    getInitialValue: getValue,
    value: state,
    changeValue: onChange,
    toggle: onToggle,
  }
}
