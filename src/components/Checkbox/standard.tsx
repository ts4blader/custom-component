import React, { forwardRef } from "react"
import { Checkbox } from "."
import { cn } from "utils/helper"

type CheckboxStandardProps = {
  children?: React.ReactNode
  wrapperProps?: React.ComponentProps<"label">
} & React.ComponentProps<typeof Checkbox.Indicator>

const CheckboxStandard = forwardRef<HTMLInputElement, CheckboxStandardProps>(
  ({ wrapperProps, children, className, ...props }, ref) => {
    return (
      <label aria-checked={props.checked} {...wrapperProps}>
        <Checkbox>
          <Checkbox.Indicator
            ref={ref}
            className={cn("mr-2", className)}
            {...props}
          />
          {children}
        </Checkbox>
      </label>
    )
  }
)

export { CheckboxStandard }
