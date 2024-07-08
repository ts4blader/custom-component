import { forwardRef, memo } from "react"
import { cn } from "utils/helper"
import { VariantProps } from "class-variance-authority"
import { boxVariant, iconVariant, wrapperVariant } from "./variant"
import { Check } from "lucide-react"
import { PickerSkin, PickerSkinProps } from "components/Picker"

//* checkbox

export type CheckboxProps = Omit<PickerSkinProps, "size" | "type"> &
  VariantProps<typeof boxVariant>

const Checkbox = memo(
  forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, theme, size, children, wrapperProps, ...rest }, ref) => {
      return (
        <PickerSkin
          ref={ref}
          type="checkbox"
          wrapperProps={{
            className: cn(wrapperVariant(), wrapperProps?.className),
            ...wrapperProps,
          }}
          {...rest}
        >
          <div className={cn(boxVariant({ theme, size }))}>
            <Check className={cn(iconVariant({ size }))} />
          </div>
          {children}
        </PickerSkin>
      )
    }
  )
)

export { Checkbox }
