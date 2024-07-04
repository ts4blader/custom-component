import React, {
  ChangeEvent,
  createContext,
  forwardRef,
  memo,
  useContext,
  useMemo,
} from "react"

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

//* context
const PickerContext = createContext<Omit<PickerProps, "children"> | null>(null)

const usePickerContext = () => {
  const context = useContext(PickerContext)
  if (!context) {
    throw new Error("usePickerContext must be used within an PickerProvider")
  }
  return context
}

const Picker = ({
  onChange,
  value,
  type = PickerType.single,
  children,
}: PickerProps) => {
  return (
    <PickerContext.Provider value={{ onChange, value, type }}>
      {children}
    </PickerContext.Provider>
  )
}

//* selector
type PickerSelectorProps = {
  children: React.ReactNode
  wrapperProps?: React.ComponentProps<"label">
} & React.ComponentProps<"input">

const PickerSelector = memo(
  forwardRef<HTMLInputElement, PickerSelectorProps>(
    ({ children, wrapperProps, ...rest }, ref) => {
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
        <label
          aria-disabled={rest.disabled}
          aria-selected={isChecked}
          {...wrapperProps}
        >
          <input
            ref={ref}
            checked={isChecked}
            type={type}
            onChange={onChange}
            className="hidden-input peer"
            {...rest}
          />
          {children}
        </label>
      )
    }
  )
)

Picker.Single = memo((props: PickerProps) => (
  <Picker type={PickerType.single} {...props} />
))
Picker.Multiple = memo((props: PickerProps) => (
  <Picker type={PickerType.multiple} {...props} />
))

export { Picker, usePickerContext, PickerSelector }
