import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "."
import { LockKeyhole } from "lucide-react"

const sizes = ["sm", "md", "lg"] as const
const themes = ["solid", "soft", "ghost", "outline"] as const

const meta = {
  title: "Components/Button",
  component: Button,
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
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const ThemeDefault: Story = {
  args: {
    className: "min-w-[200px]",
    theme: "solid",
    size: "md",
    disabled: false,
    children: "Button",
    loading: false,
  },
}

export const WithIcon = () => {
  return (
    <Button theme="solid" className="min-w-[200px]">
      <LockKeyhole size={16} />
      <span>Button</span>
    </Button>
  )
}
