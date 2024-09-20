import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "."
import { Checkbox as CheckboxCommon } from "./common"

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

export const Common = () => {
  return (
    <>
      <h2 className="my-4 text-lg font-semibold">With text</h2>
      <div className="flex items-center space-x-3">
        <CheckboxCommon checked />
      </div>

      <h2 className="my-4 text-lg font-semibold">Size</h2>
      <div className="flex items-center space-x-3">
        <CheckboxCommon size="sm" defaultChecked />
        <CheckboxCommon size="sm" />

        <CheckboxCommon size="md" defaultChecked />
        <CheckboxCommon size="md" />

        <CheckboxCommon size="lg" defaultChecked />
        <CheckboxCommon size="lg" />
      </div>
    </>
  )
}
