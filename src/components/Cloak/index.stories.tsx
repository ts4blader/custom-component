import type { Meta, StoryObj } from "@storybook/react"
import { Cloak } from "."

const sizes = ["sm", "md", "lg"] as const
const themes = ["solid", "soft", "ghost", "outline"] as const

const meta = {
  title: "Components/Cloak",
  component: Cloak,
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
} satisfies Meta<typeof Cloak>

export default meta
type Story = StoryObj<typeof meta>

export const ThemeDefault: Story = {
  args: {
    hover: false,
    className: "min-w-[200px] min-h-[200px]",
    theme: "solid",
    size: "md",
    children:
      "Consectetur numquam quaerat modi ipsum magnam. Velit ut quisquam magnam. Quisquam adipisci adipisci labore neque amet neque. Velit magnam numquam dolore aliquam labore. Quisquam etincidunt neque adipisci. Dolorem dolore porro etincidunt aliquam. Labore magnam porro tempora quiquia. Etincidunt amet consectetur amet. Consectetur quiquia quiquia quaerat eius neque eius dolore.",
  },
}
