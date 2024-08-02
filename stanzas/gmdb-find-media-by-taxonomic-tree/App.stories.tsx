import { Meta, StoryObj } from "@storybook/react";
import App from "./App";

const meta: Meta<typeof App> = {
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (S) => (
      <div style={{ backgroundColor: "aqua", height: "100vh" }}>
        <S />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof App>;
export const Primary: Story = {};
