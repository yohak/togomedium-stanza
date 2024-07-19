import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { AngleLeftIcon } from "./AngleLeftIcon";
import { makeComponentStoryTitle } from "../../utils/storybook";

export default {
  title: makeComponentStoryTitle(AngleLeftIcon.name, "icons"),
  component: AngleLeftIcon,
} as ComponentMeta<typeof AngleLeftIcon>;

const Template: ComponentStory<typeof AngleLeftIcon> = (args) => <AngleLeftIcon {...args} />;

const defaultArgs: ComponentProps<typeof AngleLeftIcon> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
