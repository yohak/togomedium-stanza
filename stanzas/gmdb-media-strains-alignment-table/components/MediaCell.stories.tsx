import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { MediaCell } from "./MediaCell";

const meta: Meta<typeof MediaCell> = {
  component: MediaCell,
};
export default meta;

const defaultArgs: ComponentProps<typeof MediaCell> = {
  label: "POTATO-SUCROSE AGAR",
  id: "JCM_333",
  size: 1,
};
type Story = StoryObj<typeof MediaCell>;

export const Primary: Story = {
  args: { ...defaultArgs },
};
export const LargeItem: Story = {
  args: { ...defaultArgs, size: 4 },
};
export const LongItem: Story = {
  args: { ...defaultArgs, label: "Long long long text long long long text" },
};
