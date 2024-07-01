import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Checkbox } from "."
import { CheckboxGroup, CheckboxGroupItem } from "./group"
import { CheckboxForm, CheckboxFormItem } from "./form"

const sizes = ["sm", "md", "lg"] as const
const themes = ["default", "forest"] as const

type Theme = (typeof themes)[number]
type Size = (typeof sizes)[number]

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    theme: {
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
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "green",
    checked: true,
    children: "Checkbox button",
    disabled: false,
    theme: "default",
    size: "md",
  },
}

export const Group = () => {
  const options = ["green", "yellow", "blue", "red"]
  const [value, setValue] = useState<string[]>([])

  return (
    <>
      <CheckboxGroup value={value} onChange={setValue}>
        <div className="flex items-center space-x-5">
          {options.map((item, index) => (
            <CheckboxGroupItem key={index} value={item}>
              {item}
            </CheckboxGroupItem>
          ))}
        </div>
      </CheckboxGroup>
    </>
  )
}

export const Form = () => {
  return (
    <CheckboxForm name="color" initValue={["green"]}>
      <div className="flex items-center space-x-5">
        <CheckboxFormItem value="green">green</CheckboxFormItem>
        <CheckboxFormItem value="yellow">yellow</CheckboxFormItem>
        <CheckboxFormItem value="blue">blue</CheckboxFormItem>
        <CheckboxFormItem value="red">red</CheckboxFormItem>
      </div>
    </CheckboxForm>
  )
}
