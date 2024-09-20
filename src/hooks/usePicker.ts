import { ChangeEvent, useCallback, useState } from "react"
import { useList } from "react-use"

type SingleOption = {
  initialValue?: string
}

const defaultSingle: SingleOption = {}

type MultipleOption = {
  initialValue?: string[]
}

const defaultMultiple: MultipleOption = {
  initialValue: [],
}

const usePickerSingle = ({ initialValue } = defaultSingle) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return { value, handleChange }
}

const usePickerMultiple = ({ initialValue } = defaultMultiple) => {
  const [value, { set, push, removeAt }] = useList<string>(initialValue)

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

  return { value, handleChange, setValue: set }
}

export { usePickerSingle, usePickerMultiple }
