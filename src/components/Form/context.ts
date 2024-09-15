import { createSharedContext } from "hooks/createShareContext"

export type FieldContextType = {
  name: string
}

const [useFieldContext, FieldProvider] =
  createSharedContext<FieldContextType>("field")

export type FormItemContextType = {
  id: string
}

const [useFormItemContext, FormItemProvider] =
  createSharedContext<FormItemContextType>("form-item")

export { FieldProvider, useFieldContext, useFormItemContext, FormItemProvider }
