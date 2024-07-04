import { memo } from "react"
import { Checkbox, CheckboxProps } from "."
import { useFormContext } from "react-hook-form"
import { FieldContext, useFieldContext } from "components/Form/context"

//* Checkbox form

type CheckboxFormProps = {
  name: string
  children: React.ReactNode
}

const CheckboxForm = memo((props: CheckboxFormProps) => {
  const { children, ...rest } = props

  return <FieldContext.Provider value={rest}>{children}</FieldContext.Provider>
})

//* Checkbox item
const CheckboxFormItem = (props: React.PropsWithoutRef<CheckboxProps>) => {
  const { name } = useFieldContext()
  const form = useFormContext()

  return <Checkbox {...form.register(name)} {...props} />
}

export { CheckboxForm, CheckboxFormItem }
