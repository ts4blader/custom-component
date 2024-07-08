import { memo } from "react"
import { Checkbox, CheckboxProps } from "."
import { useFormContext } from "react-hook-form"
import { FieldProvider, useFieldContext } from "components/Form/context"

//* Checkbox form

type CheckboxFormProps = {
  name: string
  children: React.ReactNode
}

const CheckboxForm = memo((props: CheckboxFormProps) => {
  const { children, ...rest } = props

  return <FieldProvider value={rest}>{children}</FieldProvider>
})

//* Checkbox item
const CheckboxFormItem = (props: React.PropsWithoutRef<CheckboxProps>) => {
  const { name } = useFieldContext()
  const form = useFormContext()

  return <Checkbox {...form.register(name)} {...props} />
}

export { CheckboxForm, CheckboxFormItem }
