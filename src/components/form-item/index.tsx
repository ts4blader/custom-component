import React, { useId } from "react"
import { ComponentUnion } from "types"
import { cn } from "utils/helper"

interface FormItemProps<T> extends React.ComponentProps<ComponentUnion> {
  error?: React.ReactNode
  label?: React.ReactNode
  as?: T
  children: React.ReactNode | ((id: string) => React.ReactNode)
  labelClass?: string
  errorClass?: string
}

const FormItem = ({
  as = "div",
  error,
  label,
  children,
  errorClass,
  labelClass,
}: FormItemProps<ComponentUnion>) => {
  const id = useId()
  const Component = as
  const Children = typeof children === "function" ? children(id) : children

  return (
    <Component>
      {label && (
        <label htmlFor={id} className={cn("mb-3 text-sm block", labelClass)}>
          {label}
        </label>
      )}
      {Children}
      {error && (
        <p className={cn("mt-3 text-sm text-red-500 font-600", errorClass)}>
          {error}
        </p>
      )}
    </Component>
  )
}

export default React.memo(FormItem)
