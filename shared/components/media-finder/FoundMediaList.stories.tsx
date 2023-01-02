import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { FoundMediaList } from "./FoundMediaList";
import { makeComponentStoryTitle } from "../../utils/storybook";

export default {
  title: makeComponentStoryTitle(FoundMediaList.name, "MediaFinder"),
  component: FoundMediaList,
} as ComponentMeta<typeof FoundMediaList>;

const Template: ComponentStory<typeof FoundMediaList> = (args) => <FoundMediaList {...args} />;

const defaultArgs: ComponentProps<typeof FoundMediaList> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
