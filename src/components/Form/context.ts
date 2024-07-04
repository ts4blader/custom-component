import { createContext, useContext } from "react"

export type FieldContextType = {
  name: string
}

const FieldContext = createContext<FieldContextType | null>(null)
const useFieldContext = () => {
  const context = useContext(FieldContext)
  if (!context) {
    throw new Error("useFieldContext must be used within an FieldProvider")
  }

  return context
}

export { FieldContext, useFieldContext }
