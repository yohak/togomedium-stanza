import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { DoubleAngleRightIcon } from "./DoubleAngleRightIcon";
import { makeComponentStoryTitle } from "../../utils/storybook";

export default {
  title: makeComponentStoryTitle(DoubleAngleRightIcon.name, "icons"),
  component: DoubleAngleRightIcon,
} as ComponentMeta<typeof DoubleAngleRightIcon>;

const Template: ComponentStory<typeof DoubleAngleRightIcon> = (args) => (
  <DoubleAngleRightIcon {...args} />
);

const defaultArgs: ComponentProps<typeof DoubleAngleRightIcon> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
