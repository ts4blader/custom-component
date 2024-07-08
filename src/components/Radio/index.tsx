import { forwardRef, memo } from "react"
import { cn } from "utils/helper"
import { VariantProps } from "class-variance-authority"
import { boxVariant, wrapperVariant } from "./variant"
import { PickerSkin, PickerSkinProps } from "components/Picker"

//* radio
export type RadioProps = Omit<PickerSkinProps, "type" | "size"> &
  VariantProps<typeof boxVariant>

const Radio = memo(
  forwardRef<HTMLInputElement, RadioProps>(
    ({ className, theme, size, children, wrapperProps, ...rest }, ref) => {
      return (
        <PickerSkin
          ref={ref}
          type="radio"
          wrapperProps={{
            className: cn(wrapperVariant(), wrapperProps?.className),
            ...wrapperProps,
          }}
          {...rest}
        >
          <span className={cn(boxVariant({ theme, size }), className)} />
          {children}
        </PickerSkin>
      )
    }
  )
)

export { Radio }
