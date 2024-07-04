import type { Meta, StoryObj } from "@storybook/react"
import { Radio } from "."
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "./group"
import { RadioForm, RadioFormItem } from "./form"
import { FormProvider, useForm } from "react-hook-form"
import { usePickerSingle } from "components/Picker/hook"

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
  const themeState = usePickerSingle({ initialValue: "default" as Theme })
  const sizeState = usePickerSingle({ initialValue: "md" as Size })

  return (
    <>
      <RadioGroup value={themeState.value} onChange={themeState.handleChange}>
        <div className="flex items-center space-x-5">
          {themes.map((item, index) => (
            <RadioGroupItem key={index} value={item}>
              {item}
            </RadioGroupItem>
          ))}
        </div>
      </RadioGroup>

      <RadioGroup value={sizeState.value} onChange={sizeState.handleChange}>
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
  const form = useForm<{ color: string }>()

  return (
    <FormProvider {...form}>
      <RadioForm name="color">
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="flex items-center space-x-5"
        >
          <RadioFormItem value="green">green</RadioFormItem>
          <RadioFormItem value="yellow">yellow</RadioFormItem>
          <RadioFormItem value="blue">blue</RadioFormItem>
          <RadioFormItem value="red">red</RadioFormItem>

          <button>Submit</button>
        </form>
      </RadioForm>
    </FormProvider>
  )
}
