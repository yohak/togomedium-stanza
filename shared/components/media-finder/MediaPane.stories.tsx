import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { MediaPane } from "./MediaPane";
import { makeComponentStoryTitle } from "../../utils/storybook";

export default {
  title: makeComponentStoryTitle(MediaPane.name, "MediaFinder"),
  component: MediaPane,
} as ComponentMeta<typeof MediaPane>;

const Template: ComponentStory<typeof MediaPane> = (args) => <MediaPane {...args} />;

const defaultArgs: ComponentProps<typeof MediaPane> = {
  dispatchEvent: () => {},
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
