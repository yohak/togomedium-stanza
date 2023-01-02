import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { SelectedMediaList } from "./SelectedMediaList";
import { makeComponentStoryTitle } from "../../utils/storybook";

export default {
  title: makeComponentStoryTitle(SelectedMediaList.name, "MediaFinder"),
  component: SelectedMediaList,
} as ComponentMeta<typeof SelectedMediaList>;

const Template: ComponentStory<typeof SelectedMediaList> = (args) => (
  <SelectedMediaList {...args} />
);

const defaultArgs: ComponentProps<typeof SelectedMediaList> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
