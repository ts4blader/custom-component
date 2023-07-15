import { VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "utils/helper"
import { wrapper, input, addon } from "./variant"

type MixedInputType = Omit<React.ComponentProps<"input">, "className"> &
  VariantProps<typeof wrapper>

interface InputProps extends MixedInputType {
  className?: string
  affix?: React.ReactNode
  suffix?: React.ReactNode
  error?: boolean
}

type MixedAddonType = Omit<React.ComponentProps<"span">, "className"> &
  VariantProps<typeof addon>

interface InputAddonProps extends MixedAddonType {
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, affix, suffix, size, theme, error, ...rest }, ref) => {
    return (
      <div
        className={cn(
          "input-wrapper",
          wrapper({ className, size, theme }),
          error && "!border-red-400 !ring-2 !ring-red-200",
          rest.disabled && "!bg-slate-100 pointer-events-none"
        )}
      >
        {suffix && <span className="shrink-0">{suffix}</span>}
        <input className={input({ size })} ref={ref} {...rest} />
        {affix && <span className="shrink-0">{affix}</span>}
      </div>
    )
  }
)

export const InputAddon = React.memo(
  ({ className, size, theme, position, ...rest }: InputAddonProps) => {
    return (
      <span className={addon({ size, theme, position, className })} {...rest} />
    )
  }
)

export default React.memo(Input)
