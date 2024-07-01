import React, { memo } from "react"
import { cn } from "utils/helper"
import { VariantProps } from "class-variance-authority"
import {
  boxVariant,
  iconVariant,
  inputVariant,
  wrapperVariant,
} from "./variant"
import { Check } from "lucide-react"

//* checkbox
export type CheckboxProps = {
  value: string
  children?: React.ReactNode
  wrapperProps?: React.ComponentProps<"label">
} & Omit<React.ComponentProps<"input">, "type" | "size"> &
  VariantProps<typeof boxVariant>

const Checkbox = memo(
  ({
    id,
    className,
    theme,
    size,
    children,
    wrapperProps,
    ...rest
  }: CheckboxProps) => {
    return (
      <label
        aria-disabled={rest.disabled}
        className={cn(wrapperVariant(), wrapperProps?.className)}
        {...wrapperProps}
      >
        <input className={cn(inputVariant())} type="checkbox" {...rest} />
        <div className={cn(boxVariant({ theme, size }), className)}>
          <Check className={cn(iconVariant({ size }))} />
        </div>
        {children}
      </label>
    )
  }
)

export { Checkbox }
