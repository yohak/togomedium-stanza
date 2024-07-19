import { Meta, StoryObj } from "@storybook/react";
import { AlignmentTable } from "./AlignmentTable";
import { mediaAlignmentTableResponse1 } from "../../../api/media-alignment-table/response1";

const meta: Meta<typeof AlignmentTable> = {
  component: AlignmentTable,
};
export default meta;

type Story = StoryObj<typeof AlignmentTable>;
export const Primary: Story = {
  args: {
    data: mediaAlignmentTableResponse1,
  },
};
