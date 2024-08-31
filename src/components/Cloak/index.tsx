import { Slot } from "@radix-ui/react-slot"
import { forwardRef, memo } from "react"
import { cn } from "utils/helper"
import { cloakVariant } from "./variant"
import { VariantProps } from "class-variance-authority"

type CloakProps = {
  asChild?: boolean
} & React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof cloakVariant>

const Cloak = memo(
  forwardRef<HTMLDivElement, CloakProps>(
    ({ asChild, className, theme, size, hover, ...props }, ref) => {
      const Comp = asChild ? Slot : "div"

      return (
        <Comp
          className={cn(cloakVariant({ theme, size, hover }), className)}
          ref={ref}
          {...props}
        />
      )
    }
  )
)

export { Cloak }
