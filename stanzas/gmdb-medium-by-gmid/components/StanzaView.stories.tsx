import { Meta, StoryObj } from "@storybook/react";
import { StanzaView } from "./StanzaView";
import { data1 } from "../testing/data1";

const meta: Meta<typeof StanzaView> = {
  component: StanzaView,
};
export default meta;

type Story = StoryObj<typeof StanzaView>;
export const Primary: Story = {
  args: data1,
};
