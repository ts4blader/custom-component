import React from "react"
import { CircleX, Eye, LockKeyhole } from "lucide-react"
import { Input } from "."

const AddonClear = ({
  onClear,
  ...props
}: React.PropsWithoutRef<typeof Input.Addon> & {
  onClear: () => void
}) => {
  return (
    <Input.Addon asChild {...props}>
      <button onClick={onClear}>
        <CircleX size={16} />
      </button>
    </Input.Addon>
  )
}

const AddonPassword = ({
  value,
  onToggle,
  ...props
}: React.PropsWithoutRef<typeof Input.Addon> & {
  value: boolean
  onToggle: () => void
}) => {
  return (
    <Input.Addon asChild {...props}>
      <button onClick={onToggle}>
        {value ? <LockKeyhole size={16} /> : <Eye size={16} />}
      </button>
    </Input.Addon>
  )
}

export { AddonClear, AddonPassword }
