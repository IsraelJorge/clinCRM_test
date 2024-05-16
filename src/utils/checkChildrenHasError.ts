import React from 'react'

export type ChildrenError = React.ReactElement<{
  message?: string
}>

export const checkChildrenHasError = (children?: ChildrenError) => {
  if (!children) return false

  if (Array.isArray(children))
    return children.some((child: ChildrenError) => !!child?.props?.message)

  return Boolean((children as ChildrenError).props?.message)
}
