import { VariantProps } from "class-variance-authority"
import React, { forwardRef, memo } from "react"
import { cn } from "utils/helper"
import { addonVariant, inputVariant, wrapperVariant } from "./variant"
import { createSharedContext } from "hooks/createShareContext"
import { Slot } from "@radix-ui/react-slot"

type InputContextType = {}

type InputProps = {
  children?: React.ReactNode
  wrapperProps?: React.ComponentProps<"div">
} & Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof wrapperVariant>

const [useInputContext, InputProvider] =
  createSharedContext<InputContextType>("input")

const InputRoot = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { children, wrapperProps, variant, size, className, ...rest } = props

    return (
      <InputProvider value={{}}>
        <div
          className={cn(
            wrapperVariant({ variant, size }),
            rest.disabled && "opacity-50",
            wrapperProps?.className
          )}
          {...wrapperProps}
        >
          <input
            ref={ref}
            size={0}
            type="text"
            className={cn(inputVariant({ variant }), className)}
            {...rest}
          />

          {children}
        </div>
      </InputProvider>
    )
  })
)

type InputAddonProps = {
  asChild?: boolean
} & React.ComponentProps<"span"> &
  VariantProps<typeof addonVariant>

const Addon = memo(({ asChild, side, className, ...rest }: InputAddonProps) => {
  const Comp = asChild ? Slot : "span"

  return <Comp className={cn(addonVariant({ side }), className)} {...rest} />
})

const AddonLeft = (props: React.PropsWithoutRef<InputAddonProps>) => (
  <Addon side="left" {...props} />
)
const AddonRight = (props: React.PropsWithoutRef<InputAddonProps>) => (
  <Addon side="right" {...props} />
)

// export
const Input = Object.assign(InputRoot, {
  Addon,
  AddonLeft,
  AddonRight,
})

export { Input, useInputContext }
