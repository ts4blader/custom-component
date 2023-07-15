import React from "react"
import { wrapper } from "./variant"
import { VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

type MixedType = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof wrapper>

interface ButtonProps extends MixedType {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ theme, size, className, asChild = false, ...rest }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={wrapper({ theme, size, className })}
        ref={ref}
        {...rest}
      />
    )
  }
)

export default React.memo(Button)
