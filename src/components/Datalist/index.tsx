import { createSharedContext } from "hooks/createShareContext"
import React, { forwardRef, memo } from "react"
import { cn } from "utils/helper"

type DataListContext = {
  labelClassname?: string
  valueClassname?: string
}

const [useDLContext, DataListProvider] =
  createSharedContext<DataListContext>("DataList")

type DataListProps = React.ComponentProps<"dl"> & DataListContext

const DataList = memo(
  forwardRef<HTMLDListElement, DataListProps>(
    ({ labelClassname, valueClassname, className, ...props }, ref) => {
      return (
        <DataListProvider value={{ labelClassname, valueClassname }}>
          <dl
            className={cn("grid grid-cols-[auto,1fr] gap-2", className)}
            ref={ref}
            {...props}
          />
        </DataListProvider>
      )
    }
  )
)

const DataListLabel = memo(
  forwardRef<HTMLDataElement, React.ComponentProps<"dt">>(
    ({ className, ...props }, ref) => {
      const { labelClassname } = useDLContext()

      return (
        <dt className={cn(labelClassname, className)} ref={ref} {...props} />
      )
    }
  )
)

const DataListValue = memo(
  forwardRef<HTMLDataElement, React.ComponentProps<"dd">>(
    ({ className, ...props }, ref) => {
      const { valueClassname } = useDLContext()

      return (
        <dd className={cn(valueClassname, className)} ref={ref} {...props} />
      )
    }
  )
)

export { DataList, DataListLabel, DataListValue }
