import { Meta, StoryObj } from "@storybook/react";
import { MediaCol } from "./MediaCol";
import { data1 } from "../../../api/media_strains_alignment/data1";
import { processDisplayData } from "../functions/processMediaCell";

const meta: Meta<typeof MediaCol> = {
  component: MediaCol,
};
export default meta;

type Story = StoryObj<typeof MediaCol>;
export const Primary: Story = {
  args: {
    mediaList: processDisplayData(data1).media,
  },
};
