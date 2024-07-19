import { Meta, StoryObj } from "@storybook/react";
import { ScrollableTable } from "./ScrollableTable";
import { mediaAlignmentTableResponse2 } from "../../../api/media-alignment-table/response2";

const meta: Meta<typeof ScrollableTable> = {
  component: ScrollableTable,
};
export default meta;

type Story = StoryObj<typeof ScrollableTable>;
export const Primary: Story = {
  args: {
    data: mediaAlignmentTableResponse2,
  },
};
