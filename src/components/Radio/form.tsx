import { createContext, memo, useContext } from "react"
import { Radio, RadioProps } from "."
import { VariantProps } from "class-variance-authority"
import { boxVariant } from "./variant"

//* context
const RadioFormContext = createContext<Omit<RadioFormProps, "children"> | null>(
  null
)

const useRadioFormContext = () => {
  const context = useContext(RadioFormContext)
  if (!context) {
    throw new Error("useRadioContext must be used within an RadioFormProvider")
  }

  return context
}

//* radio group
type RadioFormProps = {
  name: string
  initValue?: string
  children: React.ReactNode
} & VariantProps<typeof boxVariant>

const RadioForm = memo((props: RadioFormProps) => {
  const { children, ...rest } = props

  return (
    <RadioFormContext.Provider value={rest}>
      {children}
    </RadioFormContext.Provider>
  )
})

//* radio item
const RadioFormItem = (props: React.PropsWithoutRef<RadioProps>) => {
  const { name, initValue, size, theme } = useRadioFormContext()

  return (
    <Radio
      theme={theme}
      size={size}
      name={name}
      defaultChecked={initValue === props.value}
      {...props}
    />
  )
}

export { RadioForm, RadioFormItem, useRadioFormContext }
