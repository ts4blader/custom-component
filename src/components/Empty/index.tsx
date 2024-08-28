import { Database } from "lucide-react"
import React, { memo } from "react"
import { cn } from "utils/helper"

type EmptyProps = {
  empty?: boolean
} & React.ComponentProps<"div">

const Empty = memo(
  ({ empty = false, className, children, ...props }: EmptyProps) => {
    if (!empty) return children

    return (
      <div className={cn("text-center text-gray-700", className)} {...props}>
        <Database size={40} />
        <p className="mt-2 text-sm">No data</p>
      </div>
    )
  }
)

export default Empty
