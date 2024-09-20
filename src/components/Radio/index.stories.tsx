import type { Meta, StoryObj } from "@storybook/react"
import { Radio } from "."
import { Field } from "components/Form/field"
import { RadioStandard } from "./standard"

const sizes = ["sm", "md", "lg"] as const
const themes = ["default", "forest"] as const

const meta = {
  title: "Components/Radio",
  component: Radio,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    variant: {
      type: "string",
      control: "select",
      options: themes,
    },

    size: {
      type: "string",
      control: "select",
      options: sizes,
    },
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default = () => {
  return (
    <Field>
      <Field.Control>
        <Radio className="mr-2" />
      </Field.Control>
      <Field.Label>Radio</Field.Label>
    </Field>
  )
}

export const Standard = () => {
  return (
    <>
      <h2 className="my-4 text-lg font-semibold">With text</h2>
      <div className="flex items-center space-x-3">
        <RadioStandard>Radio</RadioStandard>
      </div>

      <h2 className="my-4 text-lg font-semibold">Size</h2>
      <div className="flex items-center space-x-3">
        <RadioStandard size="sm" defaultChecked />
        <RadioStandard size="sm" />

        <RadioStandard size="md" defaultChecked />
        <RadioStandard size="md" />

        <RadioStandard size="lg" defaultChecked />
        <RadioStandard size="lg" />
      </div>
    </>
  )
}
