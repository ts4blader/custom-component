import { createSharedContext } from "hooks/createShareContext"
import React, { forwardRef, memo, useCallback } from "react"
import { cn } from "utils/helper"

//* picker
export enum PickerType {
  single = "radio",
  multiple = "checkbox",
}

type InputValue = React.ComponentProps<"input">["value"]
type InputOnChange = React.ComponentProps<"input">["onChange"]

export type PickerProps = {
  value: InputValue
  onChange: InputOnChange
  type?: PickerType
  children: React.ReactNode
}

const [usePickerContext, PickerProvider] =
  createSharedContext<Omit<PickerProps, "children">>("picker")

const usePickerDerived = () => {
  const { value, type } = usePickerContext()

  const getChecked = useCallback(
    (current: InputValue) => {
      if (type === PickerType.multiple && Array.isArray(value)) {
        return value.includes(current)
      }

      if (type === PickerType.single && !Array.isArray(value)) {
        return value === current
      }

      return false
    },
    [value, type]
  )

  return { getChecked }
}

//* root
const PickerRoot = memo(
  ({ onChange, value, type = PickerType.single, children }: PickerProps) => {
    return (
      <PickerProvider value={{ onChange, value, type }}>
        {children}
      </PickerProvider>
    )
  }
)

//* selector
type PickerSelectorProps = {
  value: InputValue
} & React.ComponentProps<"label">

const PickerSelector = memo(
  forwardRef<HTMLLabelElement, PickerSelectorProps>(
    ({ className, children, ...rest }, ref) => {
      const { onChange, type, value } = usePickerContext()
      const { getChecked } = usePickerDerived()

      return (
        <label
          ref={ref}
          aria-selected={getChecked(rest.value)}
          className={cn("relative hover:cursor-pointer", className)}
          {...rest}
        >
          <input
            value={value}
            checked={getChecked(value)}
            type={type}
            onChange={onChange}
            className="hidden peer"
          />
          {children}
        </label>
      )
    }
  )
)

//* control
type PickerControlProps = {
  value: InputValue
  children: React.ReactElement
}
const PickerControl = memo(({ value, children }: PickerControlProps) => {
  const { onChange, type } = usePickerContext()
  const { getChecked } = usePickerDerived()

  return React.cloneElement(children, {
    value,
    checked: getChecked(value),
    type,
    onChange,
  })
})

const PickerMultiple = (props: React.ComponentProps<typeof Picker>) => (
  <Picker {...props} type={PickerType.multiple} />
)

// export
const Picker = Object.assign(PickerRoot, {
  Selector: PickerSelector,
  Control: PickerControl,
})
export { Picker, usePickerContext, usePickerDerived, PickerMultiple }
