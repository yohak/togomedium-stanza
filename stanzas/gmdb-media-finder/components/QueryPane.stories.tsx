import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QueryPane } from "./QueryPane";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("QueryPane", "MediaFinder"),
  component: QueryPane,
} as ComponentMeta<typeof QueryPane>;

const Template: ComponentStory<typeof QueryPane> = (args) => <QueryPane {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
