import { Meta, StoryObj } from "@storybook/react";
import App from "./App";

const meta: Meta<typeof App> = {
  component: App,
};
export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {
  args: {
    gmId: "M2294",
  },
};
export const Result2: Story = {
  args: {
    gmId: "M1015",
  },
};
export const Result3: Story = {
  args: {
    gmId: "M2293",
  },
};
