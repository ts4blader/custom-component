import { createContext, useContext } from "react"

type Option = {
  skipError?: boolean
}

const defaultOptions: Option = {
  skipError: false,
}

const createSharedContext = <T extends object>(
  name?: string,
  options = defaultOptions
) => {
  const nameStr = name || "shared"
  const Context = createContext<T | null>(null)

  const useRequireContext = () => {
    const context = useContext(Context)
    if (!context) {
      throw new Error(
        `use ${nameStr} context must be used within an ${nameStr} provider`
      )
    }

    return context
  }

  const useOptionalContext = () => useContext(Context)

  return [useRequireContext, Context.Provider, useOptionalContext] as const
}

export { createSharedContext }
