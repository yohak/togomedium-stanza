import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HeaderCell } from "./HeaderCell";

export default {
  title: "Components/MediaAlignmentTable/HeaderCell",
  component: HeaderCell,
} as ComponentMeta<typeof HeaderCell>;

const Template: ComponentStory<typeof HeaderCell> = (args) => <HeaderCell {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Media",
  isExpanded: false,
};
