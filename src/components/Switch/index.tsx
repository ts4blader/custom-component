import { VariantProps } from "class-variance-authority"
import { PickerSkin, PickerSkinProps } from "components/Picker"
import { forwardRef, memo } from "react"
import { cn } from "utils/helper"
import { trackVariant, circleVariant, wrapperVariant } from "./variant"

type SwitchProps = {} & Omit<PickerSkinProps, "type" | "size"> &
  VariantProps<typeof trackVariant>

const Switch = memo(
  forwardRef<HTMLInputElement, SwitchProps>(
    ({ wrapperProps, theme, size, children, ...props }, ref) => {
      return (
        <PickerSkin
          ref={ref}
          type="checkbox"
          wrapperProps={{
            className: cn(wrapperVariant(), wrapperProps?.className),
            ...wrapperProps,
          }}
          {...props}
        >
          <div className={cn(trackVariant({ theme, size }))}>
            <span className={cn(circleVariant({ size }))} />
          </div>
          {children}
        </PickerSkin>
      )
    }
  )
)

export { Switch }
