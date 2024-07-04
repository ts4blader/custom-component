import { CheckboxProps } from "."
import { boxVariant, iconVariant, wrapperVariant } from "./variant"
import { Picker, PickerSelector } from "components/Picker"
import { cn } from "utils/helper"
import { Check } from "lucide-react"

//* group
const CheckboxGroup = Picker.Multiple

//* item
const CheckboxGroupItem = ({
  theme,
  size,
  children,
  wrapperProps,
  ...rest
}: React.PropsWithoutRef<CheckboxProps>) => {
  return (
    <PickerSelector
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
    </PickerSelector>
  )
}

export { CheckboxGroup, CheckboxGroupItem }
