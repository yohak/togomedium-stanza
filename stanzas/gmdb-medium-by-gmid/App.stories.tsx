import { Meta, StoryObj } from "@storybook/react";
import { App } from "./App";
//
const meta: Meta<typeof App> = {
  component: App,
};
export default meta;

type Story = StoryObj<typeof App>;

export const Primary: Story = {
  args: {
    gm_id: "M1470",
  },
};
export const Secondary: Story = {
  args: {
    gm_id: "M439",
  },
};
