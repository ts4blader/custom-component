import { VariantProps } from "class-variance-authority"
import React, { forwardRef, memo, useId, useMemo } from "react"
import { checkboxVariants } from "./variant"
import { cn } from "utils/helper"
import { Check } from "lucide-react"
import { createSharedContext } from "hooks/createShareContext"

type CheckboxContext = { id?: string }
const [_, Provider, useCheckbox] =
  createSharedContext<CheckboxContext>("Checkbox")

type CheckboxProps = CheckboxContext & {
  children?: React.ReactNode
}

const CheckboxRoot = memo(({ id, children }: CheckboxProps) => {
  const _id = useId()
  const elementID = useMemo(() => id || _id, [id, _id])

  return <Provider value={{ id: elementID }}>{children}</Provider>
})
CheckboxRoot.displayName = "Checkbox"

type CheckboxIndicatorProps = Omit<React.ComponentProps<"input">, "size"> & {
  children?: React.ReactNode
} & VariantProps<typeof checkboxVariants>
const CheckboxIndicator = memo(
  forwardRef<HTMLInputElement, CheckboxIndicatorProps>(
    ({ children, variant, size, className, ...props }, ref) => {
      const context = useCheckbox()

      return (
        <>
          <input
            id={context?.id}
            ref={ref}
            type="checkbox"
            className="hidden-input peer"
            {...props}
          />
          <div className={cn(checkboxVariants({ variant, size }), className)}>
            {children || <Check size={12} />}
          </div>
        </>
      )
    }
  )
)
CheckboxIndicator.displayName = "CheckboxIndicator"

type CheckboxLabelProps = React.ComponentProps<"label">
const CheckboxLabel = memo(
  forwardRef<HTMLLabelElement, CheckboxLabelProps>(({ ...props }, ref) => {
    const context = useCheckbox()

    return <label htmlFor={context?.id} ref={ref} {...props} />
  })
)
CheckboxLabel.displayName = "CheckboxLabel"

// export
const Checkbox = Object.assign(CheckboxRoot, {
  Label: CheckboxLabel,
  Indicator: CheckboxIndicator,
})

export { Checkbox }
