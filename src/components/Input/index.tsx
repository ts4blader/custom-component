import { VariantProps } from "class-variance-authority"
import React, { forwardRef } from "react"
import { cn } from "utils/helper"
import { inputVariant, wrapperVariant } from "./variant"
import { createSharedContext } from "hooks/createShareContext"

type InputProps = {
  children?: React.ReactNode
  wrapperProps?: React.ComponentProps<"div">
} & Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof wrapperVariant>

const [useInputContext, InputProvider] =
  createSharedContext<Omit<InputProps, "children">>("input")

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { children, wrapperProps, theme, size, className, ...rest } = props

  return (
    <InputProvider value={props}>
      <div
        className={cn(
          wrapperVariant({ theme, size }),
          rest.disabled && "opacity-50",
          wrapperProps?.className
        )}
        {...wrapperProps}
      >
        <input
          ref={ref}
          size={0}
          type="text"
          className={cn(inputVariant({ theme, size }), className)}
          {...rest}
        />

        {children}
      </div>
    </InputProvider>
  )
})

const MemorizedInput = React.memo(Input)

export { MemorizedInput as Input, useInputContext }
