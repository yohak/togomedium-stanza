import { Meta, StoryObj } from "@storybook/react";
import { StanzaView } from "./StanzaView";
import { data1 } from "../../../api/all-media/data1";

const meta: Meta<typeof StanzaView> = {
  component: StanzaView,
};
export default meta;

type Story = StoryObj<typeof StanzaView>;
export const Primary: Story = {
  args: {
    data: data1,
    title: "Title",
    showColumnNames: true,
    columnSizes: [20, 30, 50],
    offset: 0,
    setOffset: () => {},
    limit: 20,
    setLimit: () => {},
    isLoading: false,
    errorMessage: "",
  },
};
