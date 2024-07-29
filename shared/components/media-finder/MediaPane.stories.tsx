import { Meta, StoryObj } from "@storybook/react";
import { MediaPane } from "./MediaPane";

const meta: Meta<typeof MediaPane> = {
  component: MediaPane,
};
export default meta;

type Story = StoryObj<typeof MediaPane>;
export const Primary: Story = {
  args: {
    dispatchEvent: () => {},
  },
};
