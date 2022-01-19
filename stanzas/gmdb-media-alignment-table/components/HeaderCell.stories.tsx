import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HeaderCell } from "./HeaderCell";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("HeaderCell", "MediaAlignmentTable"),
  component: HeaderCell,
} as ComponentMeta<typeof HeaderCell>;

const Template: ComponentStory<typeof HeaderCell> = (args) => <HeaderCell {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Media",
  isExpanded: false,
};
