import { Meta, StoryObj } from "@storybook/react";
import { ListTable } from "./ListTable";
import { data1 } from "../../../api/all-media/data1";
import { StanzaWrapper } from "../../../shared/components/StanzaWrapper";

const meta: Meta<typeof ListTable> = {
  component: ListTable,
  decorators: [
    (Story) => (
      <StanzaWrapper>
        <Story />
      </StanzaWrapper>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof ListTable>;
export const Primary: Story = {
  args: {
    data: data1,
    showColumnNames: true,
    columnSizes: [15, 15, 70],
    limit: 20,
  },
};
