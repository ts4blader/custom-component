import { Slot } from "@radix-ui/react-slot"
import { createSharedContext } from "hooks/createShareContext"
import React, { forwardRef, memo, useId } from "react"

export type FieldContextType = {
  id?: string
}

const [useField, FieldProvier] = createSharedContext<FieldContextType>("field")

const FieldRoot = memo(
  ({
    id,
    children,
  }: {
    children: React.ReactNode
  } & FieldContextType) => {
    const _id = useId()

    return <FieldProvier value={{ id: id || _id }}>{children}</FieldProvier>
  }
)

const FieldLabel = memo(
  forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<"label">>(
    (props, ref) => {
      const { id } = useField()
      return <label ref={ref} htmlFor={id} {...props} />
    }
  )
)

const FieldControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>((props, ref) => {
  const { id } = useField()
  return <Slot ref={ref} id={id} {...props} />
})

// export
const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  Control: FieldControl,
})

export { Field, useField, FieldProvier }
