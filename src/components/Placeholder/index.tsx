import { LoaderCircle } from "lucide-react"
import React, { memo } from "react"
import { cn } from "utils/helper"

type SpinnerProps = React.ComponentProps<typeof LoaderCircle>

const Spinner = memo((props: SpinnerProps) => {
  return (
    <LoaderCircle
      size={20}
      className={cn("animate-spin", props.className)}
      {...props}
    />
  )
})

export { Spinner }
