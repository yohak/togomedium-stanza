import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AttributesTab } from "./attributesTab";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("AttributesTab", "MediaFinder"),
  component: AttributesTab,
} as ComponentMeta<typeof AttributesTab>;

const Template: ComponentStory<typeof AttributesTab> = (args) => <AttributesTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
