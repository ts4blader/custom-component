import { createContext, useContext } from "react"

const createSharedContext = <T extends object>(name?: string) => {
  const nameStr = name || "shared"
  const Context = createContext<T | null>(null)

  const useSharedContext = () => {
    const context = useContext(Context)
    if (!context) {
      throw new Error(
        `use ${nameStr} context must be used within an ${nameStr} provider`
      )
    }

    return context
  }

  return [useSharedContext, Context.Provider] as const
}

export { createSharedContext }
