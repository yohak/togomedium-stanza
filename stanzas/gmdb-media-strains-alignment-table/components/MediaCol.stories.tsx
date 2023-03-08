import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { MediaCol } from "./MediaCol";
import { data1 } from "../../../api/media_strains_alignment/data1";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";
import { processDisplayData } from "../functions/processMediaCell";

export default {
  title: makeComponentStoryTitle(MediaCol.name, "MediaStrainAlignment"),
  component: MediaCol,
} as ComponentMeta<typeof MediaCol>;

const Template: ComponentStory<typeof MediaCol> = (args) => <MediaCol {...args} />;

const processedData = processDisplayData(data1);
const defaultArgs: ComponentProps<typeof MediaCol> = {
  mediaList: processedData.media,
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
