import { LoaderCircle } from "lucide-react"
import React, { memo } from "react"
import { cn } from "utils/helper"

type SpinnerProps = {
  loading?: boolean
} & React.ComponentProps<"span">

const Spinner = memo(
  ({ loading = false, className, children, ...props }: SpinnerProps) => {
    if (!loading) return children

    return (
      <span className={cn("relative text-center", className)} {...props}>
        <span className="invisible">{children}</span>
        <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <LoaderCircle className="animate-spin" size={20} />
        </span>
      </span>
    )
  }
)

export default Spinner
