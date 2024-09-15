import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "."
import { CheckboxStandard } from "./standard"

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
    <Checkbox>
      <div className="flex items-center">
        <Checkbox.Indicator className="mr-2" size="md" variant="default" />
        <Checkbox.Label>Checkbox</Checkbox.Label>
      </div>
    </Checkbox>
  )
}

export const Standard = () => {
  return (
    <>
      <h2 className="my-4 text-lg font-semibold">With text</h2>
      <div className="flex items-center space-x-3">
        <CheckboxStandard>Checkbox</CheckboxStandard>
      </div>

      <h2 className="my-4 text-lg font-semibold">Size</h2>
      <div className="flex items-center space-x-3">
        <CheckboxStandard size="sm" defaultChecked />
        <CheckboxStandard size="sm" />

        <CheckboxStandard size="md" defaultChecked />
        <CheckboxStandard size="md" />

        <CheckboxStandard size="lg" defaultChecked />
        <CheckboxStandard size="lg" />
      </div>
    </>
  )
}
