import { Meta, StoryObj } from "@storybook/react";
import App from "./App";

const meta: Meta<typeof App> = {
  component: App,
};
export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {
  args: {
    gmo_id: "GMO_001001",
  },
};
export const Result2: Story = {
  args: {
    gmo_id: "GMO_001018",
  },
};
export const Result3: Story = {
  args: {
    gmo_id: "GMO_001113",
  },
};
