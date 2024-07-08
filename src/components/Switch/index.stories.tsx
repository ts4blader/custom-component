import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "."

const sizes = ["sm", "md", "lg"] as const
const themes = ["default", "forest"] as const

const meta = {
  title: "Components/Switch",
  component: Switch,
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
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const ThemeDefault: Story = {
  args: {
    className: "min-w-[200px]",
    theme: "default",
    size: "md",
    disabled: false,
    children: "Switch",
    defaultChecked: true,
  },
}
