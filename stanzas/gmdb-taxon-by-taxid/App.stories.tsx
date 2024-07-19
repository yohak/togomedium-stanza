import { Meta, StoryObj } from "@storybook/react";
import App from "./App";

const meta: Meta<typeof App> = {
  component: App,
};

export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {
  args: {
    tax_id: "315405",
  },
};
export const Result2: Story = {
  args: {
    tax_id: "1301",
  },
};
export const Result3: Story = {
  args: {
    tax_id: "201174",
  },
};
export const Result4: Story = {
  args: {
    tax_id: "2636952",
  },
};
