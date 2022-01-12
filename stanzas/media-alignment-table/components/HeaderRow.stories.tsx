import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HeaderRow } from "./HeaderRow";

export default {
  title: "HeaderRow",
  component: HeaderRow,
} as ComponentMeta<typeof HeaderRow>;

const Template: ComponentStory<typeof HeaderRow> = (args) => <HeaderRow {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
