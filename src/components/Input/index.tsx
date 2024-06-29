import { VariantProps } from "class-variance-authority"
import React, { useContext } from "react"
import { cn } from "utils/helper"
import { inputVariant, wrapperVariant } from "./variant"

type InputProps = {
  children?: React.ReactNode
  wrapperProps?: React.ComponentProps<"div">
} & Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof wrapperVariant>

//* context
const InputContext = React.createContext<InputProps>({})
const useInputContext = () => {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error("useInputContext must be used within an InputProvider")
  }

  return context
}

const Input = (props: InputProps) => {
  const { children, wrapperProps, theme, size, className, ...rest } = props

  return (
    <InputContext.Provider value={props}>
      <div
        className={cn(
          wrapperVariant({ theme, size }),
          rest.disabled && "opacity-50",
          wrapperProps?.className
        )}
        {...wrapperProps}
      >
        <input
          size={5}
          type="text"
          className={cn(inputVariant({ theme, size }), className)}
          {...rest}
        />

        {children}
      </div>
    </InputContext.Provider>
  )
}

const MemorizedInput = React.memo(Input)
Input.DisplayName = "Input"

export { MemorizedInput as Input, useInputContext }
