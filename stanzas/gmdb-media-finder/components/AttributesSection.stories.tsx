import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AttributesSection } from "./AttributesSection";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("AttributesSection", "MediaFinder"),
  component: AttributesSection,
} as ComponentMeta<typeof AttributesSection>;

const Template: ComponentStory<typeof AttributesSection> = (args) => (
  <AttributesSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
