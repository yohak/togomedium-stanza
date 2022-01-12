import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AlignmentTable } from "./AlignmentTable";

export default {
  title: "AlignmentTable",
  component: AlignmentTable,
} as ComponentMeta<typeof AlignmentTable>;

const Template: ComponentStory<typeof AlignmentTable> = (args) => <AlignmentTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
