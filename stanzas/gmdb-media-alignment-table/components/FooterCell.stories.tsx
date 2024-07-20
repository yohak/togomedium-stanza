import { Meta, StoryObj } from "@storybook/react";
import { FooterCell } from "./FooterCell";

const meta: Meta<typeof FooterCell> = {
  component: FooterCell,
};
export default meta;

type Story = StoryObj<typeof FooterCell>;
export const Level0: Story = {
  args: {
    label: "Distilled Water",
    level: 0,
    hasChildren: false,
    isOpen: false,
    id: "id",
  },
};
export const Level1: Story = {
  args: {
    label: "Distilled Water",
    level: 1,
    hasChildren: true,
    isOpen: true,
    id: "id",
  },
};
