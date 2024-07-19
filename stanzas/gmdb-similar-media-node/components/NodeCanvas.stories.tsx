import { Meta, StoryObj } from "@storybook/react";
import { NodeCanvas } from "./NodeCanvas";
import { data1 } from "../utils/data1";
import { data2 } from "../utils/data2";

const meta: Meta<typeof NodeCanvas> = {
  component: NodeCanvas,
};
export default meta;

type Story = StoryObj<typeof NodeCanvas>;
export const Primary: Story = {
  args: {
    data: data1,
  },
};
export const Secondary: Story = {
  args: {
    data: data2,
  },
};
