import { VariantProps } from "class-variance-authority"
import React, { forwardRef, memo } from "react"
import { radioVariant } from "./variant"
import { cn } from "utils/helper"

type RadioProps = Omit<React.ComponentProps<"input">, "size"> & {
  children?: React.ReactNode
  wrapperProps?: React.ComponentProps<"label">
} & VariantProps<typeof radioVariant>

const Radio = memo(
  forwardRef<HTMLInputElement, RadioProps>(
    ({ children, wrapperProps, variant, size, className, ...props }, ref) => {
      return (
        <label
          className={cn("flex items-center", wrapperProps?.className)}
          {...wrapperProps}
        >
          <input
            ref={ref}
            type="radio"
            className="hidden-input peer"
            {...props}
          />
          <div className={cn(radioVariant({ variant, size }), className)} />
          {children}
        </label>
      )
    }
  )
)
Radio.displayName = "Radio"

export { Radio }
