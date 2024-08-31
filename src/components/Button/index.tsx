import { VariantProps } from "class-variance-authority"
import React, { forwardRef, memo } from "react"
import { cn } from "utils/helper"
import { buttonVariant } from "./variant"
import { Spinner } from "components/Spinner"

type ButtonProps = {
  loading?: boolean
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariant>

const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        type = "button",
        disabled,
        loading,
        theme,
        square,
        size,
        className,
        children,
        ...rest
      },
      ref
    ) => {
      return (
        <button
          ref={ref}
          className={cn(buttonVariant({ theme, size, square }), className)}
          disabled={loading || disabled}
          type={type}
          {...rest}
        >
          <Spinner loading={loading}>{children}</Spinner>
        </button>
      )
    }
  )
)

export { Button }
