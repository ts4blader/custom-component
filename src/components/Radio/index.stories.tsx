import type { Meta, StoryObj } from "@storybook/react"
import { Radio } from "."
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "./group"
import { RadioForm, RadioFormItem } from "./form"

const sizes = ["sm", "md", "lg"] as const
const themes = ["default", "forest"] as const

type Theme = (typeof themes)[number]
type Size = (typeof sizes)[number]

const meta = {
  title: "Components/Radio",
  component: Radio,
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
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "green",
    checked: true,
    children: "Radio button",
    disabled: false,
    theme: "default",
    size: "md",
  },
}

export const Group = () => {
  const [value, setValue] = useState<Theme>("default")
  const [size, setSize] = useState<Size>("md")

  return (
    <>
      <RadioGroup
        theme={value}
        size={size}
        value={value}
        onChange={(data) => setValue(data as Theme)}
      >
        <div className="flex items-center space-x-5">
          {themes.map((item, index) => (
            <RadioGroupItem key={index} value={item}>
              {item}
            </RadioGroupItem>
          ))}
        </div>
      </RadioGroup>

      <RadioGroup
        theme={value}
        size={size}
        value={size}
        onChange={(data) => setSize(data as Size)}
      >
        <div className="flex items-center mt-6 space-x-5">
          {sizes.map((item, index) => (
            <RadioGroupItem key={index} value={item}>
              {item}
            </RadioGroupItem>
          ))}
        </div>
      </RadioGroup>
    </>
  )
}

export const Form = () => {
  return (
    <RadioForm name="color" initValue="green">
      <div className="flex items-center space-x-5">
        <RadioFormItem value="green">green</RadioFormItem>
        <RadioFormItem value="yellow">yellow</RadioFormItem>
        <RadioFormItem value="blue">blue</RadioFormItem>
        <RadioFormItem value="red">red</RadioFormItem>
      </div>
    </RadioForm>
  )
}
