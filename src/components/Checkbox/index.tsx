import { VariantProps } from "class-variance-authority"
import React, { forwardRef, memo } from "react"
import { checkboxVariants } from "./variant"
import { cn } from "utils/helper"
import { Check } from "lucide-react"

type CheckboxProps = Omit<React.ComponentProps<"input">, "size"> & {
  children?: React.ReactNode
  wrapperProps?: React.ComponentProps<"label">
} & VariantProps<typeof checkboxVariants>

const Checkbox = memo(
  forwardRef<HTMLInputElement, CheckboxProps>(
    ({ children, wrapperProps, variant, size, className, ...props }, ref) => {
      return (
        <label
          className={cn("flex items-center", wrapperProps?.className)}
          {...wrapperProps}
        >
          <input
            ref={ref}
            type="checkbox"
            className="hidden-input peer"
            {...props}
          />
          <div className={cn(checkboxVariants({ variant, size }), className)}>
            <Check size={12} />
          </div>
          {children}
        </label>
      )
    }
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
