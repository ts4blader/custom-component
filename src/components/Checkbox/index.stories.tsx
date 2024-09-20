import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "."
import { Picker, PickerMultiple } from "components/Picker"
import { usePickerMultiple } from "hooks/usePicker"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default = () => {
  return (
    <>
      <h2 className="my-4 text-lg font-semibold">With text</h2>
      <div className="flex items-center space-x-3">
        <Checkbox>Checkbox</Checkbox>
      </div>

      <h2 className="my-4 text-lg font-semibold">Size</h2>
      <div className="flex items-center space-x-3">
        <Checkbox size="sm" defaultChecked />
        <Checkbox size="sm" />

        <Checkbox size="md" defaultChecked />
        <Checkbox size="md" />

        <Checkbox size="lg" defaultChecked />
        <Checkbox size="lg" />
      </div>
    </>
  )
}

export const Group = () => {
  const picker = usePickerMultiple()

  console.log(picker.value)

  return (
    <PickerMultiple value={picker.value} onChange={picker.handleChange}>
      <div className="flex items-center space-x-3">
        <Picker.Control value="Green">
          <Checkbox>Green</Checkbox>
        </Picker.Control>

        <Picker.Control value="Red">
          <Checkbox>Red</Checkbox>
        </Picker.Control>

        <Picker.Control value="Blue">
          <Checkbox>Blue</Checkbox>
        </Picker.Control>
      </div>
    </PickerMultiple>
  )
}
