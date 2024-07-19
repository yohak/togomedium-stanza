import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { DoubleAngleLeftIcon } from "./DoubleAngleLeftIcon";
import { makeComponentStoryTitle } from "../../utils/storybook";

export default {
  title: makeComponentStoryTitle(DoubleAngleLeftIcon.name, "icons"),
  component: DoubleAngleLeftIcon,
} as ComponentMeta<typeof DoubleAngleLeftIcon>;

const Template: ComponentStory<typeof DoubleAngleLeftIcon> = (args) => (
  <DoubleAngleLeftIcon {...args} />
);

const defaultArgs: ComponentProps<typeof DoubleAngleLeftIcon> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
