import { createContext, memo, useCallback, useContext } from "react"
import { Checkbox, CheckboxProps } from "."
import { VariantProps } from "class-variance-authority"
import { boxVariant } from "./variant"

//* context
type CheckboxGroupContextType = {
  handleChange: (value: string) => void
} & Omit<CheckboxGroupProps, "children">

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(
  null
)

const useCheckboxGroupContext = () => {
  const context = useContext(CheckboxGroupContext)
  if (!context) {
    throw new Error(
      "useCheckboxContext must be used within an CheckboxGroupProvider"
    )
  }

  return context
}

//* Checkbox group
type CheckboxGroupProps = {
  value: string[]
  onChange: (value: string[]) => void
  children: React.ReactNode
} & VariantProps<typeof boxVariant>

const CheckboxGroup = memo((props: CheckboxGroupProps) => {
  const { value, onChange, children, ...rest } = props

  const handleChange = useCallback(
    (input: string) => {
      if (value.includes(input)) {
        onChange(value.filter((item) => item !== input))
        return
      }

      const valueSet = new Set([...value, input])
      onChange(Array.from(valueSet))
    },
    [value, onChange]
  )

  return (
    <CheckboxGroupContext.Provider
      value={{ handleChange, value, onChange, ...rest }}
    >
      {children}
    </CheckboxGroupContext.Provider>
  )
})

//* Checkbox group item
const CheckboxGroupItem = (props: React.PropsWithoutRef<CheckboxProps>) => {
  const { theme, size, handleChange, value } = useCheckboxGroupContext()

  return (
    <Checkbox
      theme={theme}
      size={size}
      onChange={(e) => handleChange(e.target.value)}
      checked={value.includes(props.value)}
      {...props}
    />
  )
}

export { CheckboxGroup, CheckboxGroupItem, useCheckboxGroupContext }
