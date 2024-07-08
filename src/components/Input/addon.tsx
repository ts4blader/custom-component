import React, { memo } from "react"
import { useInputContext } from "."
import { cn } from "utils/helper"
import { addonVariant } from "./variant"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps } from "class-variance-authority"
import { CircleX } from "lucide-react"

type InputAddonProps = {
  asChild?: boolean
} & React.ComponentProps<"span"> &
  VariantProps<typeof addonVariant>

const Addon = memo(
  ({ asChild, type, side, className, ...rest }: InputAddonProps) => {
    const { size, theme } = useInputContext()
    const Comp = asChild ? Slot : "span"

    return (
      <Comp
        className={cn(addonVariant({ theme, size, side, type }), className)}
        {...rest}
      />
    )
  }
)

const AddonLeft = (props: React.PropsWithoutRef<InputAddonProps>) => {
  return <Addon {...props} side="left" />
}

const AddonRight = (props: React.PropsWithoutRef<InputAddonProps>) => {
  return <Addon {...props} side="right" />
}

//* addon variant
const AddonClear = (props: React.PropsWithoutRef<InputAddonProps>) => {
  return (
    <Addon asChild {...props}>
      <button>
        <CircleX size={16} />
      </button>
    </Addon>
  )
}

export { Addon, AddonLeft, AddonRight, AddonClear }
