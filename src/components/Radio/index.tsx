import React, { forwardRef, memo } from "react"
import { cn } from "utils/helper"
import { VariantProps } from "class-variance-authority"
import { boxVariant, wrapperVariant } from "./variant"

//* radio
export type RadioProps = {
  value: string
  children?: React.ReactNode
  wrapperProps?: React.ComponentProps<"label">
} & Omit<React.ComponentProps<"input">, "type" | "size"> &
  VariantProps<typeof boxVariant>

const Radio = memo(
  forwardRef<HTMLInputElement, RadioProps>(
    ({ className, theme, size, children, wrapperProps, ...rest }, ref) => {
      return (
        <label
          aria-disabled={rest.disabled}
          className={cn(wrapperVariant(), wrapperProps?.className)}
          {...wrapperProps}
        >
          <input
            ref={ref}
            className="hidden-input peer"
            type="radio"
            {...rest}
          />
          <span className={cn(boxVariant({ theme, size }), className)} />
          {children}
        </label>
      )
    }
  )
)

export { Radio }
