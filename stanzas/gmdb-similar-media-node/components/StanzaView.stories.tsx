import { Meta, StoryObj } from "@storybook/react";
import { StanzaView } from "./StanzaView";

const meta: Meta<typeof StanzaView> = {
  component: StanzaView,
};
export default meta;

type Story = StoryObj<typeof StanzaView>;
export const Primary: Story = {
  args: {
    gmId: "M2294",
  },
};
