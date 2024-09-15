import { Picker, PickerType } from "components/Picker"
import React, { forwardRef } from "react"
import { Checkbox } from "."

const CheckboxGroupRoot = (props: React.ComponentProps<typeof Picker>) => {
  return <Picker type={PickerType.multiple} {...props} />
}

type CheckboxGroupItemProps = {} & React.ComponentProps<typeof Picker.Control> &
  React.ComponentProps<typeof Checkbox.Indicator>
const CheckboxGroupItem = forwardRef<HTMLInputElement, CheckboxGroupItemProps>(
  ({ value, ...props }, ref) => {
    return (
      <Picker.Control ref={ref} value={value}>
        <Checkbox.Indicator value={value} {...props} />
      </Picker.Control>
    )
  }
)

// export
const CheckboxGroup = Object.assign(CheckboxGroupRoot, {
  Item: CheckboxGroupItem,
})
export { CheckboxGroup }
