import type { Meta, StoryObj } from "@storybook/react"
import { DataList, DataListLabel, DataListValue } from "."

const meta = {
  title: "Components/DataList",
  component: DataList,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DataList>

export default meta
// type Story = StoryObj<typeof meta>

export const ThemeDefault = () => {
  return (
    <DataList labelClassname="font-semibold">
      <DataListLabel>Status</DataListLabel>
      <DataListValue>Active</DataListValue>

      <DataListLabel>ID</DataListLabel>
      <DataListValue>2142921412</DataListValue>

      <DataListLabel>Name</DataListLabel>
      <DataListValue>Vlad Moroz</DataListValue>

      <DataListLabel>Email</DataListLabel>
      <DataListValue>vlad@workos.com</DataListValue>
    </DataList>
  )
}
