import { VariantProps } from "class-variance-authority"
import React, { forwardRef, memo } from "react"
import { cn } from "utils/helper"
import { buttonVariant } from "./variant"
import { Spinner } from "components/Placeholder"

type ButtonProps = {
  loading?: boolean
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariant>

const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      { type = "button", disabled, loading, theme, size, className, ...rest },
      ref
    ) => {
      return (
        <button
          ref={ref}
          className={cn(buttonVariant({ theme, size }), className)}
          disabled={loading || disabled}
          type={type}
          {...rest}
        >
          {loading ? <Spinner /> : rest.children}
        </button>
      )
    }
  )
)

export { Button }
