import { memo } from "react"
import { Radio, RadioProps } from "."
import { FieldContext, useFieldContext } from "components/Form/context"
import { useFormContext } from "react-hook-form"

//* radio form
type RadioFormProps = {
  name: string
  children: React.ReactNode
}

const RadioForm = memo((props: RadioFormProps) => {
  const { children, ...rest } = props

  return <FieldContext.Provider value={rest}>{children}</FieldContext.Provider>
})

//* radio item
const RadioFormItem = (props: React.PropsWithoutRef<RadioProps>) => {
  const { name } = useFieldContext()
  const form = useFormContext()

  return <Radio {...form.register(name)} {...props} />
}

export { RadioForm, RadioFormItem }
