import { Meta, StoryObj } from "@storybook/react";
import { InfoColumns } from "./InfoColumns";
import { mediaAlignmentTableResponse1 } from "../../../api/media-alignment-table/response1";

const meta: Meta<typeof InfoColumns> = {
  component: InfoColumns,
};
export default meta;

type Story = StoryObj<typeof InfoColumns>;
export const Primary: Story = {
  args: {
    data: mediaAlignmentTableResponse1,
  },
};
