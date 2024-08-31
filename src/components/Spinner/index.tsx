import { LoaderCircle } from "lucide-react"
import React, { memo } from "react"
import { cn } from "utils/helper"

type SpinnerProps = {
  loading?: boolean
  size?: number
} & React.ComponentProps<"div">

const Spinner = memo(
  ({
    loading = false,
    size = 20,
    className,
    children,
    ...props
  }: SpinnerProps) => {
    if (!loading) return children

    return (
      <div
        className={cn("relative w-fit text-center min-h-5", className)}
        {...props}
      >
        <span className="invisible">{children}</span>
        <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <LoaderCircle className="animate-spin" size={size} />
        </span>
      </div>
    )
  }
)

export { Spinner }
