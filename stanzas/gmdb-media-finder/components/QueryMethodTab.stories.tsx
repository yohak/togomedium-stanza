import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QueryMethodTab } from "./QueryMethodTab";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("QueryMethodTab", "MediaFinder"),
  component: QueryMethodTab,
} as ComponentMeta<typeof QueryMethodTab>;

const Template: ComponentStory<typeof QueryMethodTab> = (args) => <QueryMethodTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
