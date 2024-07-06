import { Slot } from "@radix-ui/react-slot"
import { VariantProps } from "class-variance-authority"
import React, { memo } from "react"
import { cardVariant } from "./variant"
import { cn } from "utils/helper"

type CardProps = {
  asChild?: boolean
} & React.ComponentProps<"div"> &
  VariantProps<typeof cardVariant>

const Card = memo(({ theme, size, className, asChild, ...rest }: CardProps) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp className={cn(cardVariant({ theme, size }), className)} {...rest} />
  )
})

export { Card }
