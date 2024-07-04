import React, { forwardRef, memo } from "react"
import { cn } from "utils/helper"
import { VariantProps } from "class-variance-authority"
import { boxVariant, iconVariant, wrapperVariant } from "./variant"
import { Check } from "lucide-react"

//* checkbox
export type CheckboxProps = {
  children?: React.ReactNode
  wrapperProps?: React.ComponentProps<"label">
} & Omit<React.ComponentProps<"input">, "type" | "size"> &
  VariantProps<typeof boxVariant>

const Checkbox = memo(
  forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, theme, size, children, wrapperProps, ...rest }, ref) => {
      return (
        <label
          aria-disabled={rest.disabled}
          className={cn(wrapperVariant(), wrapperProps?.className)}
          {...wrapperProps}
        >
          <input
            ref={ref}
            className={cn("hidden-input peer", className)}
            type="checkbox"
            {...rest}
          />
          <div className={cn(boxVariant({ theme, size }))}>
            <Check className={cn(iconVariant({ size }))} />
          </div>
          {children}
        </label>
      )
    }
  )
)

export { Checkbox }
