import React, { ChangeEvent, forwardRef, memo, useMemo } from "react"
import { createSharedContext } from "utils/shared-context"

//* skin
export type PickerSkinProps = {
  children: React.ReactNode
  wrapperProps?: React.ComponentProps<"label">
} & React.ComponentProps<"input">

const PickerSkin = forwardRef<HTMLInputElement, PickerSkinProps>(
  ({ className, children, wrapperProps, ...rest }, ref) => {
    return (
      <label
        aria-selected={rest.checked}
        aria-disabled={rest.disabled}
        {...wrapperProps}
      >
        <input ref={ref} className="hidden-input peer" {...rest} />
        {children}
      </label>
    )
  }
)

//* picker
export enum PickerType {
  single = "radio",
  multiple = "checkbox",
}

export type PickerProps = {
  value: React.ComponentProps<"input">["value"]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: PickerType
  children: React.ReactNode
}

const [usePickerContext, PickerProvider] =
  createSharedContext<Omit<PickerProps, "children">>("picker")

const Picker = ({
  onChange,
  value,
  type = PickerType.single,
  children,
}: PickerProps) => {
  return (
    <PickerProvider value={{ onChange, value, type }}>
      {children}
    </PickerProvider>
  )
}

//* selector
type PickerSelectorProps = PickerSkinProps

const PickerSelector = memo(
  forwardRef<HTMLInputElement, PickerSelectorProps>(({ ...rest }, ref) => {
    const { onChange, value, type } = usePickerContext()

    const isChecked = useMemo(() => {
      if (type === PickerType.multiple && Array.isArray(value)) {
        return value.includes(rest.value)
      }

      if (type === PickerType.single && !Array.isArray(value)) {
        return value === rest.value
      }

      return false
    }, [value, rest.value])

    return (
      <PickerSkin
        ref={ref}
        checked={isChecked}
        type={type}
        onChange={onChange}
        {...rest}
      />
    )
  })
)

Picker.Single = memo((props: PickerProps) => (
  <Picker type={PickerType.single} {...props} />
))
Picker.Multiple = memo((props: PickerProps) => (
  <Picker type={PickerType.multiple} {...props} />
))

export { Picker, usePickerContext, PickerSelector, PickerSkin }
