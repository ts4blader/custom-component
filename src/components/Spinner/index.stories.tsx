import type { Meta, StoryObj } from "@storybook/react"
import { Spinner } from "."

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const ThemeDefault: Story = {
  args: {
    className: "min-h-[40px]",
    children: "Button",
    loading: true,
    size: 40,
  },
}
