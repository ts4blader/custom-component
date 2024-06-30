import React, { memo } from "react"
import { cn } from "utils/helper"
import { VariantProps } from "class-variance-authority"
import { boxVariant, inputVariant, wrapperVariant } from "./variant"

//* radio
export type RadioProps = {
  value: string
  children?: React.ReactNode
  wrapperProps?: React.ComponentProps<"label">
} & Omit<React.ComponentProps<"input">, "type" | "size"> &
  VariantProps<typeof boxVariant>

const Radio = memo(
  ({
    id,
    className,
    theme,
    size,
    children,
    wrapperProps,
    ...rest
  }: RadioProps) => {
    return (
      <label
        aria-disabled={rest.disabled}
        className={cn(wrapperVariant(), wrapperProps?.className)}
        {...wrapperProps}
      >
        <input className={cn(inputVariant())} type="radio" {...rest} />
        <span className={cn(boxVariant({ theme, size }), className)} />
        {children}
      </label>
    )
  }
)

export { Radio }
