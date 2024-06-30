import { createContext, memo, useContext } from "react"
import { Radio, RadioProps } from "."
import { VariantProps } from "class-variance-authority"
import { boxVariant } from "./variant"

//* context
const RadioGroupContext = createContext<Omit<
  RadioGroupProps,
  "children"
> | null>(null)

const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext)
  if (!context) {
    throw new Error("useRadioContext must be used within an RadioGroupProvider")
  }

  return context
}

//* radio group
type RadioGroupProps = {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
} & VariantProps<typeof boxVariant>

const RadioGroup = memo((props: RadioGroupProps) => {
  const { children, ...rest } = props

  return (
    <RadioGroupContext.Provider value={rest}>
      {children}
    </RadioGroupContext.Provider>
  )
})

//* radio group item
const RadioGroupItem = (props: React.PropsWithoutRef<RadioProps>) => {
  const { onChange, value, theme, size } = useRadioGroupContext()

  return (
    <Radio
      theme={theme}
      size={size}
      onChange={(e) => onChange(e.target.value)}
      checked={value === props.value}
      {...props}
    />
  )
}

export { RadioGroup, RadioGroupItem, useRadioGroupContext }
