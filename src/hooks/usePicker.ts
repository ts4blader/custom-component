import { ChangeEvent, useCallback, useState } from "react"
import { useList } from "react-use"

type SingleOption = {
  initialValue: string
}

type MultipleOption = {
  initialValue: string[]
}

const usePickerSingle = ({ initialValue }: SingleOption) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return { value, handleChange }
}

const usePickerMultiple = ({ initialValue }: MultipleOption) => {
  const [value, { push, removeAt }] = useList<string>(initialValue)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const index = value.indexOf(e.target.value)
      if (index === -1) {
        push(e.target.value)
      } else {
        removeAt(index)
      }
    },
    [value]
  )

  return { value, handleChange }
}

export { usePickerSingle, usePickerMultiple }
