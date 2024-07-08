import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "."
import { Eye, LockKeyhole } from "lucide-react"
import { AddonClear, AddonLeft, AddonRight } from "./addon"

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    theme: {
      type: "string",
      control: "select",
      options: ["default"],
    },

    size: {
      type: "string",
      control: "select",
      options: ["md", "lg", "sm"],
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const ThemeDefault: Story = {
  args: {
    className: "min-w-[200px]",
    theme: "default",
    placeholder: "Enter your email",
    size: "md",
    disabled: false,
  },
}

export const FileInput: Story = {
  args: {
    className: "min-w-[200px]",
    theme: "default",
    placeholder: "Choose the file",
    size: "md",
    disabled: false,
    type: "file",
  },
}

export const WithAddon = () => {
  return (
    <Input className="min-w-[200px]" theme="default" placeholder="Enter email">
      <AddonLeft type="border">https://</AddonLeft>
      <AddonRight>.com</AddonRight>
    </Input>
  )
}

export const WithIcon = () => {
  return (
    <Input className="min-w-[200px]" theme="default" placeholder="Enter email">
      <AddonLeft type="seemless">
        <LockKeyhole size={16} />
      </AddonLeft>
      <AddonRight type="seemless">
        <Eye size={16} />
      </AddonRight>
    </Input>
  )
}

export const WithClearIcon = () => {
  return (
    <Input className="min-w-[200px]" theme="default" placeholder="Enter email">
      <AddonClear side="right" onClick={() => alert("clear")} />
    </Input>
  )
}
