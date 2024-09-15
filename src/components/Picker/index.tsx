import { Slot } from "@radix-ui/react-slot"
import { createSharedContext } from "hooks/createShareContext"
import React, { ChangeEvent, forwardRef, memo, useCallback } from "react"
import { cn } from "utils/helper"

//* picker
export enum PickerType {
  single = "radio",
  multiple = "checkbox",
}

type InputValue = React.ComponentProps<"input">["value"]

export type PickerProps = {
  value: InputValue
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
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
      const { getChecked } = usePickerDerived()

      return (
        <label
          ref={ref}
          aria-selected={getChecked(rest.value)}
          className={cn("relative hover:cursor-pointer", className)}
          {...rest}
        >
          <PickerControl value={rest.value} />
          {children}
        </label>
      )
    }
  )
)

//* control
type PickerControlProps = {
  value: InputValue
  children?: React.ReactNode
}
const PickerControl = memo(
  forwardRef<HTMLInputElement, PickerControlProps>((props, ref) => {
    const Comp = props.children ? Slot : "input"
    const { onChange, type } = usePickerContext()
    const { getChecked } = usePickerDerived()

    return (
      <Comp
        ref={ref}
        value={props.value}
        checked={getChecked(props.value)}
        type={type}
        onChange={onChange}
        className="hidden peer"
      />
    )
  })
)

// export
const Picker = Object.assign(PickerRoot, {
  Selector: PickerSelector,
  Control: PickerControl,
})
export { Picker, usePickerContext, usePickerDerived }
