import { createContext, memo, useContext } from "react"
import { Checkbox, CheckboxProps } from "."
import { VariantProps } from "class-variance-authority"
import { boxVariant } from "./variant"
import { useFormContext } from "react-hook-form"

//* context
const CheckboxFormContext = createContext<Omit<
  CheckboxFormProps,
  "children"
> | null>(null)

const useCheckboxFormContext = () => {
  const context = useContext(CheckboxFormContext)
  if (!context) {
    throw new Error(
      "useCheckboxContext must be used within an CheckboxFormProvider"
    )
  }

  return context
}

//* Checkbox form
type CheckboxFormProps = {
  name: string
  initValue?: string[]
  children: React.ReactNode
} & VariantProps<typeof boxVariant>

const CheckboxForm = memo((props: CheckboxFormProps) => {
  const { children, ...rest } = props

  return (
    <CheckboxFormContext.Provider value={rest}>
      {children}
    </CheckboxFormContext.Provider>
  )
})

//* Checkbox item
const CheckboxFormItem = (props: React.PropsWithoutRef<CheckboxProps>) => {
  const { name, initValue, size, theme } = useCheckboxFormContext()

  return (
    <Checkbox
      theme={theme}
      size={size}
      name={name}
      defaultChecked={initValue?.includes(props.value)}
      {...props}
    />
  )
}

export { CheckboxForm, CheckboxFormItem, useCheckboxFormContext }
