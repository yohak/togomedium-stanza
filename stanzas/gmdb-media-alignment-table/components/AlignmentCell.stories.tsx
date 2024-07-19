import { Meta, StoryObj } from "@storybook/react";
import { AlignmentCell } from "./AlignmentCell";

const meta: Meta<typeof AlignmentCell> = {
  component: AlignmentCell,
};
export default meta;

type Story = StoryObj<typeof AlignmentCell>;
export const Available: Story = {
  args: {
    state: "available",
    label: "Sodium chloride",
  },
};
export const None: Story = {
  args: {
    state: "none",
    label: "Sodium chloride",
  },
};
export const Grouped: Story = {
  args: {
    state: "grouped",
    label: "Sodium chloride",
  },
};
