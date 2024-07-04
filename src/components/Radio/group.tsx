import { RadioProps } from "."
import { boxVariant, wrapperVariant } from "./variant"
import { Picker, PickerSelector } from "components/Picker"
import { cn } from "utils/helper"

//* group
const RadioGroup = Picker.Single

//* item
const RadioGroupItem = ({
  theme,
  size,
  className,
  children,
  wrapperProps,
  ...rest
}: React.PropsWithoutRef<RadioProps>) => {
  return (
    <PickerSelector
      wrapperProps={{
        className: cn(wrapperVariant(), wrapperProps?.className),
        ...wrapperProps,
      }}
      {...rest}
    >
      <span className={cn(boxVariant({ theme, size }), className)} />
      {children}
    </PickerSelector>
  )
}

export { RadioGroup, RadioGroupItem }
