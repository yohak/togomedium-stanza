import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { AngleRightIcon } from "./AngleRightIcon";
import { makeComponentStoryTitle } from "../../utils/storybook";

export default {
  title: makeComponentStoryTitle(AngleRightIcon.name, "icons"),
  component: AngleRightIcon,
} as ComponentMeta<typeof AngleRightIcon>;

const Template: ComponentStory<typeof AngleRightIcon> = (args) => <AngleRightIcon {...args} />;

const defaultArgs: ComponentProps<typeof AngleRightIcon> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
